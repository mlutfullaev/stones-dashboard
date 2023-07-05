import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Grid, Typography} from "@mui/material";
import {patchImg, patching, sending, sendingImg} from "../../../../helpers/fetching";
import axios from "axios";
import {checkFiles, createFile} from "../../../../helpers/helpers";

const BlogDialog = ({update, modal, setModal, editingBlog, setEditingBlog, setBlogs}) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [link, setLink] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (editingBlog) {
      setTitle(editingBlog.title)
      setLink(editingBlog.blogUrl)
      createFile(editingBlog.uploadedFile[0], setImage)
    } else {
      reset()
    }
  }, [modal]);

  const reset = () => {
    setTitle('')
    setLink('')
    setImage(null)
    setEditingBlog(null)
  }

  const send = () => {
    if (!title || !link || !image) return setError(true);
    const data = {
      title,
      blogUrl: link,
    };

    console.log(data);

    sending("blog/", data)
      .then(blogRes => {
        if (image) {
          sendingImg(image)
            .then((imgRes => {
              patchImg(imgRes.data.id, {blogId: blogRes.data.id})
                .then(() => {
                  reset()
                  setModal(false);
                  axios.get('http://1627061-ci09322.twc1.net:3001/blog/' + blogRes.data.id)
                    .then(newBlogRes => setBlogs(oldBlogs => {
                      let arr = [...oldBlogs]
                      arr.push(newBlogRes.data)
                      return arr;
                    }))
                });
            }));
        }
      });
  };
  const updating = async () => {
    if (!title || !link || !image) return setError(true);
    const data = {
      title,
      blogUrl: link,
    };

    patching(`blog/${editingBlog.id}`, data)
      .then(blogRes => {
        let result = await checkFiles(editingBlog.uploadedFile[0], image)
        if (!result) {

        }
      })
  };

  return (
    <Box p={2}>
      <Typography variant="h3" style={{textAlign: "center"}} p="10px 20px 20px">{update ? "Обнавление блога" : "Добавление блога"}</Typography>
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
          label="Ссылка"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          error={error && !link}
        />
        {
          image ?
            <Box style={{position: "relative", padding: 0}}>
              <Button onClick={() => setImage(null)} variant="contained" style={{position: "absolute", top: 10, right: 10, padding: 5, minWidth: 35}}>&times;</Button>
              <img style={{maxHeight: 300, width: "100%"}} src={URL.createObjectURL(image)} alt=""/>
            </Box> : null
        }
        {!image ? <>
          <input type="file" id="image-input" hidden onChange={(e) => setImage(e.target.files[0])}/>
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
            Добавить картинку
          </label>
        </>: null}
        <Button sx={{margin: 1}} onClick={update ? updating : send} variant="contained">
          {update ? "Обнавить" : "Добавить"}
        </Button>
      </Box>
    </Box>
  );
};

export default BlogDialog;