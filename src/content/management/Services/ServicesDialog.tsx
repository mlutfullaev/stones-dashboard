import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Typography} from "@mui/material";
import axios from "axios";
import {createFiles, updateArray} from "../../../helpers/helpers";
import {patchImg, patching, sending, sendingImg} from "../../../helpers/fetching";
import ImagesList from "../ImagesList";

const ServicesDialog = ({update, setUpdate, modal, setModal, editingService, setEditingService, setServices}) => {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState<{ file: File, id: number | null, deleted: false }[]>([]);
  const [info, setInfo] = useState("");
  const [serviceTitle, setServiceTitle] = useState("");
  const [error, setError] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (editingService) {
      setTitle(editingService.title);
      setInfo(editingService.info);
      setServiceTitle(editingService.serviceTitle);
      createFiles(editingService.uploadedFile, setImages);
    } else {
      reset();
    }
  }, [modal]);

  const reset = () => {
    setTitle("");
    setInfo("");
    setServiceTitle("");
    setImages([]);
  };

  const send = () => {
    if (!title || !info || !serviceTitle || !images.length) return setError(true);
    const data = {
      title,
      info,
      serviceTitle
    };

    sending("service/", data)
      .then(serviceRes => {
        if (images.length) {
          images.forEach(image => {
            sendingImg(image.file)
              .then((imgRes => {
                patchImg(imgRes.data.id, {serviceTitle: serviceRes.data.title})
                  .then(() => {
                    axios.get("http://1627061-ci09322.twc1.net:3001/service/" + serviceRes.data.id)
                      .then(newServiceRes => {
                        setServices(oldServices => [...oldServices, newServiceRes.data]);
                        reset();
                        setModal(false);
                      });
                  });
              }));
          });
        }
      });
  };
  const updating = async () => {
    if (!title || !info || !serviceTitle) return setError(true);
    let deleted = 0;
    images.forEach(img => {
      if (img.deleted) {
        deleted++
        console.log(deleted)
      }
    })
    if (deleted === images.length) return setImageError(true)

    const data = {
      title,
      info,
      serviceTitle
    };

    patching(`service/${editingService.id}`, data)
      .then(serviceRes => {
        console.log("service patched");
        if (images.length) {
          const end = (i) => {
            if (i === images.length - 1) {
              axios.get(`http://45.89.190.203:3001/service/${serviceRes.data.id}`)
                .then(newServiceRes => {
                  updateArray(setServices, newServiceRes.data);
                  setImages([]);
                  setEditingService(null);
                  setUpdate(false)
                  setModal(false);
                });
            }
          };
          images.forEach((image, i) => {
            if (image.deleted) {
              axios.delete(`http://45.89.190.203:3001/upload/${image.id}`)
                .then(() => end(i));
            }
            else if (!image.id) {
              sendingImg(image.file)
                .then(imgRes => {
                  patchImg(imgRes.data.id, {serviceTitle: serviceRes.data.title})
                    .then(() => end(i));
                });
            } else {
              end(i);
            }
          });
        }
      });
  };

  return (
    <Box p={2}>
      <Typography variant="h3" style={{textAlign: "center"}}
                  p="10px 20px 20px">{update ? "Обнавление услуги" : "Добавление услуги"}</Typography>
      <Box style={{display: "flex", gap: 10, flexDirection: "column"}}>
        <TextField
          required
          id="outlined-required"
          label="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={error && !title}
        />
        <TextField
          required
          id="outlined"
          label="Название услуги"
          value={serviceTitle}
          onChange={(e) => setServiceTitle(e.target.value)}
          error={error && !serviceTitle}
        />
        <TextField
          required
          id="outlined"
          label="Информация"
          value={info}
          onChange={(e) => setInfo(e.target.value)}
          error={error && !info}
        />

        <ImagesList images={images} setImages={setImages} imageError={imageError} setImageError={setImageError}/>
        <Button sx={{margin: 1}} onClick={update ? updating : send} variant="contained">
          {update ? "Обнавить" : "Добавить"}
        </Button>
      </Box>
    </Box>
  );
};

export default ServicesDialog;