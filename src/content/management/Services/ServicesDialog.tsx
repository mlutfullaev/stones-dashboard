import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Typography} from "@mui/material";
import axios from "axios";
import {updateArray} from "../../../helpers/helpers";
import {patchImg, patching, sending, sendingImg} from "../../../helpers/fetching";
import ImagesList from "../ImagesList";

const ServicesDialog = ({update, modal, setModal, editingService, setEditingService, setServices}) => {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState<{ file: File, id: number | null, deleted: false }[]>([]);
  const [info, setInfo] = useState("");
  const [serviceTitle, setServiceTitle] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (editingService) {
      setTitle(editingService.title);
      setInfo(editingService.info);
      setServiceTitle(editingService.serviceTitle)
    } else {
      reset();
    }
  }, [modal]);

  const reset = () => {
    setTitle("");
    setInfo("");
    setServiceTitle('')
    setImages([]);
  };

  const send = () => {
    console.log(true)
    if (!title || !info || !serviceTitle || !images.length) return setError(true);
    const data = {
      title,
      info,
      serviceTitle
    };

    console.log(data);

    sending("service/", data)
      .then(serviceRes => {
        if (images.length) {
          images.forEach(image => {
            sendingImg(image.file)
              .then((imgRes => {
                patchImg(imgRes.data.id, {blogId: serviceRes.data.id})
                  .then(() => {
                    reset();
                    setModal(false);
                    axios.get("http://1627061-ci09322.twc1.net:3001/services/" + serviceRes.data.id)
                      .then(newServiceRes => setServices(oldServices => [...oldServices, newServiceRes.data]));
                  });
              }));
          })
        }
      });
  };
  const updating = async () => {
    if (!title || !info || serviceTitle || !images.length) return setError(true);
    const data = {
      title,
      info,
      serviceTitle
    };

    patching(`service/${editingService.id}`, data)
      .then(serviceRes => {
        if (images.length) {
          images.forEach((image, i) => {
            if (!image.deleted) {
              axios.delete(`http://45.89.190.203:3001/upload/${image.id}`)
            }
            else if (!image.id) {
              sendingImg(image.file)
                .then(imgRes => patchImg(imgRes.data.id, {serviceId: serviceRes.data.id}))
            }
          })
        }
      })
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

        {/*<ImagesList images={images} setImages={setImages} />*/}
        <Button sx={{margin: 1}} onClick={update ? updating : send} variant="contained">
          {update ? "Обнавить" : "Добавить"}
        </Button>
      </Box>
    </Box>
  );
};

export default ServicesDialog;