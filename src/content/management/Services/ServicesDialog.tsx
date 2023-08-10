import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Typography} from "@mui/material";
import axios from "axios";
import {createFiles, updateArray} from "../../../helpers/helpers";
import {patchImg, patching, sending, sendingImg} from "../../../helpers/fetching";
import ImagesList from "../ImagesList";
import {siteUrl} from "../../../consts";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";

const ServicesDialog = ({update, setUpdate, modal, setModal, editingService, setEditingService, setServices}) => {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState<{ file: File, id: number | null, deleted: false }[]>([]);
  const [info, setInfo] = useState("");
  const [serviceTitle, setServiceTitle] = useState("");
  const [interorekster, setInterorekster] = useState('')
  const [error, setError] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (editingService) {
      setTitle(editingService.title);
      setInfo(editingService.info);
      setServiceTitle(editingService.serviceTitle);
      createFiles(editingService.uploadedFile, setImages);
      setInterorekster(editingService.interorekster || '')
    } else {
      reset();
    }
  }, [modal]);

  const reset = () => {
    setTitle("");
    setInfo("");
    setServiceTitle("");
    setInterorekster('')
    setImages([]);
  };

  const send = () => {
    if (!images.length) return setImageError(true)
    if (!title || !info || !serviceTitle || !interorekster) return setError(true);
    const data = {
      title,
      info,
      serviceTitle,
      interorekster
    };

    sending("service/", data)
      .then(serviceRes => {
        if (images.length) {
          images.forEach(image => {
            sendingImg(image.file)
              .then((imgRes => {
                patchImg(imgRes.data.id, {serviceTitle: serviceRes.data.title})
                  .then(() => {
                    axios.get(`${siteUrl}service/${serviceRes.data.id}`)
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
    if (!title || !info || !serviceTitle || !interorekster) return setError(true);
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
      serviceTitle,
      interorekster
    };

    patching(`service/${editingService.id}`, data)
      .then(serviceRes => {
        if (images.length) {
          const end = (i) => {
            if (i === images.length - 1) {
              axios.get(`${siteUrl}service/${serviceRes.data.id}`)
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
              axios.delete(`${siteUrl}upload/${image.id}`)
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
      <Typography variant="h3" style={{textAlign: "center"}} p="10px 20px 20px">{update ? "Обнавление услуги" : "Добавление услуги"}</Typography>
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
        <FormControl component="fieldset" style={error && !interorekster ? {borderBottom: '2px solid red'} : {}}>
          <RadioGroup
            row
            aria-label="gender"
            value={interorekster}
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="Изделия в интерьере"
              control={<Radio />}
              label="Изделия в интерьере"
              onChange={() => setInterorekster('Изделия в интерьере')}
            />
            <FormControlLabel
              value="Изделия в экстерьере"
              control={<Radio />}
              label="Изделия в экстерьере"
              onChange={() => setInterorekster('Изделия в экстерьере')}
            />
          </RadioGroup>
        </FormControl>
        <ImagesList images={images} setImages={setImages} imageError={imageError} setImageError={setImageError}/>
        <Button sx={{margin: 1}} onClick={update ? updating : send} variant="contained">
          {update ? "Обнавить" : "Добавить"}
        </Button>
      </Box>
    </Box>
  );
};

export default ServicesDialog;