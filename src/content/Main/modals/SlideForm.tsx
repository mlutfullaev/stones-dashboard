import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import {siteUrl} from "../../../consts";
import ImagesList from "../../management/ImagesList";
import {deletingBD, patchImg, sending, sendingImg} from "../../../helpers/fetching";
import {updateArray} from "../../../helpers/helpers";

const createFiles = async (slides, setImages) => {
  for (const slide of slides) {
    const response = await fetch(`${siteUrl}upload/fayl/${slide.uploadedFile[0].id}`);
    console.log(slide)
    const data = await response.blob();
    const metadata = {
      type: slide.uploadedFile[0].mimetype
    };
    const item = new File([data], slide.uploadedFile[0].originalname, metadata);
    setImages(oldItems => [...oldItems, {
      file: item,
      id: slide.uploadedFile[0].id,
      deleted: false,
      sliderId: slide.uploadedFile[0].sliderId
    }])
  }
}

const SlideForm = ({setModal}) => {
    const [sliders, setSliders] = useState([])
    const [images, setImages] = useState([])
    const [error, setError] = useState(false)

    useEffect(() => {
      axios.get(`${siteUrl}slider`)
        .then(res => {
          createFiles(res.data, setImages)
        })
    }, []);

    const update = () => {
      if (!images.length) return setError(true);
      let deleted = 0;
      images.forEach(img => {
        if (img.deleted) {
          deleted++
          console.log(deleted)
        }
      })
      if (deleted === images.length) return setError(true)
      const end = (i) => {
        if (i === images.length - 1) {
          setImages([]);
          setModal(false);
        }
      }
      images.forEach((image, i) => {
        if (image.deleted) {
          // axios.delete(`${siteUrl}slider/${image.sliderId}`, {headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`}})
          //   .then(() => {})
          // axios.delete(`${siteUrl}upload/${image.id}`, {headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`}})
          //   .then(() => end(i));
          deletingBD(`${siteUrl}slider/${image.sliderId}`)
            .then(res => deletingBD(`${siteUrl}upload/${image.id}`)
              .then(() => end(i)))
        } else if (!image.id) {
          sending(`slider/`, {})
            .then(sliderRes => {
              sendingImg(image.file)
                .then(imgRes => {
                  patchImg(imgRes.data.id, {sliderId: sliderRes.data.id})
                    .then(() => end(i));
                });
            })
        } else {
          end(i);
        }
      });
    }
    return (
      <Box p={2}>
        <Typography variant="h3" style={{textAlign: "center"}} p="10px 20px 20px">
          Обнавление слайдера
        </Typography>
        <ImagesList images={images} setImages={setImages} imageError={error} setImageError={setError}/>
        <Button sx={{margin: 1}} onClick={update} variant="contained">
          Обнавить
        </Button>
      </Box>
    );
  }
;

export default SlideForm;