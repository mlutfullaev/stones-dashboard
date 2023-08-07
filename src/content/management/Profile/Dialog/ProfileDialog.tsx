import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Typography} from "@mui/material";
import {patchImg, patching, sending, sendingImg} from "../../../../helpers/fetching";
import axios from "axios";
import {createFile, updateArray} from "../../../../helpers/helpers";
import {siteUrl} from "../../../../consts";

const BlogDialog = ({update, modal, setModal, editingProfile, setEditingProfile, setProfiles}) => {
  const [isImageNew, setIsImageNew] = useState(false);
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [link, setLink] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (editingProfile) {
      setTitle(editingProfile.title);
      setLink(editingProfile.url);
      setInfo(editingProfile.info)
      createFile(editingProfile.uploadedFile[0], setImage);
    } else {
      reset();
    }
  }, [modal]);

  const reset = () => {
    setTitle("");
    setLink("");
    setInfo('')
    setImage(null);
  };

  const send = () => {
    if (!title || !info || !image) return setError(true);
    const data = {
      title,
      url: link,
      info,
    };

    console.log(data);

    sending("profile/", data)
      .then(profileRes => {
        if (image) {
          sendingImg(image)
            .then((imgRes => {
              patchImg(imgRes.data.id, {profileId: profileRes.data.id})
                .then(() => {
                  reset();
                  setModal(false);
                  axios.get(`${siteUrl}profile/${profileRes.data.id}`)
                    .then(newBlogRes => setProfiles(oldProfiles => {
                      let arr = [...oldProfiles];
                      arr.push(newBlogRes.data);
                      return arr;
                    }));
                });
            }));
        }
      });
  };
  const updating = async () => {
    if (!title || !info || !image) return setError(true);
    const data = {
      title,
      url: link,
      info,
    };

    patching(`profile/${editingProfile.id}`, data)
      .then(profileRes => {
        console.log(profileRes.data)
        if (isImageNew) {
          setIsImageNew(false)
          axios.delete(`${siteUrl}upload/${editingProfile.uploadedFile[0].id}`)
            .then(() => {
              sendingImg(image)
                .then(imgRes => {
                  patchImg(imgRes.data.id, {profileId: profileRes.data.id})
                    .then(() => {
                      axios.get(`${siteUrl}profile/${profileRes.data.id}`)
                        .then((newProfile) => {
                          updateArray(setProfiles, newProfile.data)
                          setImage(null);
                          setEditingProfile(null)
                          setModal(false);
                        })
                    })
                })
            })
        } else {
          axios.get(`${siteUrl}profile/${profileRes.data.id}`)
            .then((newProfile) => {
              console.log(newProfile)
              updateArray(setProfiles, newProfile.data)
              setImage(null);
              setEditingProfile(null)
              setModal(false);
            })
        }
      });
  };

  return (
    <Box p={2}>
      <Typography variant="h3" style={{textAlign: "center"}} p="10px 20px 20px">{update ? "Обнавление портфолио" : "Добавление портфолио"}</Typography>
      <Box style={{display: "flex", gap: 10, flexDirection: "column"}}>
        <TextField
          required
          id="outlined-required"
          label="Текст"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={error && !title}
        />
        <TextField
          required
          id="outlined"
          label="Информация"
          value={info}
          onChange={(e) => setInfo(e.target.value)}
          error={error && !info}
        />
        <TextField
          id="outlined"
          label="Ссылка"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        {
          image ? <img style={{maxHeight: 300, width: "100%"}} src={URL.createObjectURL(image)} alt=""/> : null
        }

        <input type="file" id="image-input" hidden onChange={(e) => {
          setImage(e.target.files[0])
          setIsImageNew(true)
        }}/>
        <label htmlFor="image-input" id="label-image-input" style={{
          padding: "8px 20px",
          background: "transparent",
          border: error && !image ? "1px solid #FF1943" : "1px solid rgba(85, 105, 255, 0.5)",
          borderRadius: 10,
          color: error && !image ? "#FF1943" : "#5569ff",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "0.875rem",
          lineHeight: "1.75"
        }}>
          {image ? "Поменять картинку" : "Добавить картинку"}
        </label>

        <Button sx={{margin: 1}} onClick={update ? updating : send} variant="contained">
          {update ? "Обнавить" : "Добавить"}
        </Button>
      </Box>
    </Box>
  );
};

export default BlogDialog;