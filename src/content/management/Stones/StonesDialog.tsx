 import React, {useEffect, useState} from "react";
import axios from "axios";
import {Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionSummary from "@mui/material/AccordionSummary";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import {patchImg, patching, sending, sendingImg} from "../../../helpers/fetching";
import {createFiles, updateArray} from "../../../helpers/helpers";
import StonesVariants from "./StonesVariants";
import ImagesList from "../ImagesList";
import {siteUrl} from "../../../consts";
 import MenuItem from "@mui/material/MenuItem";

type StoneT = {
  title: string,
  abrasion: string,
  uploadedFile: { id: number }[],
  categoryTitle: string,
  country: string,
  otherNames: string,
  density: string,
  radioactivityClass: string,
  waterAbsorption: string,
  similarGranites: string,
  mohsHardness: string,
  id: number,
  variants: { format: string, pricerub: string, priceusd: string, product: string }[],
  color: string
  createdAt: string
}

type StonesDialogT = {
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  editingStone: StoneT | null
  setEditingStone: React.Dispatch<React.SetStateAction<StoneT | null>>
  update: boolean
  setStones: React.Dispatch<React.SetStateAction<StoneT[]>>
}

const categories = ['Гранит', 'Мозаика', 'Мрамор', 'Оникс', 'Травертин'];
const colors = ['#fff', '#000', '#964b00', '#FFD700', '#5cace6', '#808080', '#F5F5DC', '#008000', '#ff0000']
const colorLabels = {'#fff': 'Белый', '#000': 'Черный', '#964b00': 'Коричневый', '#FFD700': 'Желтый', '#5cace6': 'Голубой', '#808080': 'Серый', '#F5F5DC': 'Бежевый', '#008000': 'Зеленный', '#ff0000': 'Красный'}


const StonesDialog: React.FC<StonesDialogT> = ({modal, setModal, editingStone, setEditingStone, update, setStones}) => {
  const [variants, setVariants] = useState<{
    format: string,
    pricerub: string,
    priceusd: string,
    product: string
  }[]>([]);
  const [images, setImages] = useState([]);
  const [imageError, setImageError] = useState(false);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState(editingStone ? editingStone.title : "");
  const [country, setCountry] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("");
  const [abrasion, setAbrasion] = useState("");
  const [radioactivityClass, setRadioactivityClass] = useState("");
  const [waterAbsorption, setWaterAbsorption] = useState("");
  const [mohsHardness, setMohsHardness] = useState("");
  const [density, setDensity] = useState("");
  const [otherNames, setOtherNames] = useState("");
  const [similarGranites, setSimilarGranites] = useState("");
  const [variantsError, setVariantsError] = useState(false);
  const [color, setColor] = useState('')


  // const handleChange = (event) => {
  //   setCurrency(event.target.value);
  // };
  useEffect(() => {
    if (editingStone) {
      setTitle(editingStone.title);
      setOtherNames(editingStone.otherNames || "");
      setDensity(editingStone.density || "");
      setCountry(editingStone.country);
      setAbrasion(editingStone.abrasion || "");
      setWaterAbsorption(editingStone.waterAbsorption || "");
      setRadioactivityClass(editingStone.radioactivityClass || "");
      setCategoryTitle(editingStone.categoryTitle || "");
      setMohsHardness(editingStone.mohsHardness || "");
      setSimilarGranites(editingStone.similarGranites || "");
      setColor(editingStone.color || '')
      setVariants(editingStone.variants || []);
      createFiles(editingStone.uploadedFile, setImages);
    } else {
      setTitle("");
      setOtherNames("");
      setDensity("");
      setCountry("");
      setAbrasion("");
      setWaterAbsorption("");
      setRadioactivityClass("");
      setCategoryTitle("");
      setMohsHardness("");
      setSimilarGranites("");
      setColor('')
      setVariants([]);
      setImages([]);
    }
  }, [modal]);

  useEffect(() => {
    console.log(color)
  }, [color]);

  const send = () => {
    if (!variants.length) return setVariantsError(true);
    if (!title || !country || !categoryTitle || !images.length) return setError(true);
    const data = {
      title,
      country,
      categoryTitle,
      abrasion,
      radioactivityClass,
      waterAbsorption,
      mohsHardness,
      density,
      otherNames,
      similarGranites,
      color,
      variants,
    };

    sending("stones/", data)
      .then(stoneRes => {
        if (images.length) {
          images.forEach((img, i) => {
            sendingImg(img.file)
              .then(imgRes => {
                patchImg(imgRes.data.id, {stoneId: stoneRes.data.id})
                  .then(() => {
                    if (i === images.length - 1) {
                      axios.get(`${siteUrl}stones/${stoneRes.data.id}`)
                        .then((newStoneRes) => {
                          setStones(oldStones => [...oldStones, newStoneRes.data]);
                          setImages([]);
                          setEditingStone(null);
                          setModal(false);
                        });
                    }
                  });
              });
          });
        }
      });
  };

  const updating = async () => {
    if (!variants.length) return setVariantsError(true);
    if (!title || !country || !categoryTitle) return setError(true);
    const data = {
      title,
      country,
      categoryTitle,
      abrasion,
      radioactivityClass,
      waterAbsorption,
      mohsHardness,
      density,
      otherNames,
      similarGranites,
      variants,
      color,
    };

    patching(`stones/${editingStone.id}`, data)
      .then(stoneRes => {
        if (images.length) {
          const end = (i) => {
            if (i === images.length - 1) {
              axios.get(`${siteUrl}stones/${stoneRes.data.id}`)
                .then(newStoneRes => {
                  updateArray(setStones, newStoneRes.data);
                  setImages([]);
                  setEditingStone(null);
                  setModal(false);
                });
            }
          };
          images.forEach((image, i) => {
            if (image.deleted) {
              axios.delete(`${siteUrl}upload/${image.id}`)
                .then(() => end(i));
            } else if (!image.id) {
              sendingImg(image.file)
                .then(imgRes => patchImg(imgRes.data.id, {stoneId: stoneRes.data.id}))
                .then(() => end(i));
            }
          });
        }
      });
  };

  return (
      <Box p={2}>
        <Typography variant="h3" style={{textAlign: "center"}} p="10px 20px 20px">
          {update ? "Обнавление камня" : "Добавление камня"}
        </Typography>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Основные свойство</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box style={{display: "flex", gap: 10, flexWrap: "wrap"}}>
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
                label="Месторождение"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                error={error && !country}
              />
              <TextField
                id="outlined"
                label="Класс радиоактивности"
                value={radioactivityClass}
                onChange={(e) => setRadioactivityClass(e.target.value)}
              />
              <TextField
                id="outlined-required"
                label="Водопоглощение"
                value={waterAbsorption}
                onChange={(e) => setWaterAbsorption(e.target.value)}
              />
              <TextField
                id="outlined-required"
                label="Плотность"
                value={density}
                onChange={(e) => setDensity(e.target.value)}
              />
              <TextField
                id="outlined-required"
                label="Истираемость"
                value={abrasion}
                onChange={(e) => setAbrasion(e.target.value)}
              />
              <TextField
                id="outlined-required"
                label="Другие названия"
                value={otherNames}
                onChange={(e) => setOtherNames(e.target.value)}
              />
              <TextField
                id="outlined-required"
                label="Твердость по ш/м"
                value={mohsHardness}
                onChange={(e) => setMohsHardness(e.target.value)}
              />
              <TextField
                id="outlined-required"
                label="Похожие граниты"
                value={similarGranites}
                onChange={(e) => setSimilarGranites(e.target.value)}
              />
              {/*<TextField*/}
              {/*  required*/}
              {/*  id="outlined-required"*/}
              {/*  label="Название категории"*/}
              {/*  value={categoryTitle}*/}
              {/*  onChange={(e) => setCategoryTitle(e.target.value)}*/}
              {/*  error={error && !categoryTitle}*/}
              {/*/>*/}
              <TextField
                id="outlined-select-currency"
                select
                label="Категория"
                value={categoryTitle}
                style={{width: 220}}
                onChange={(e) => setCategoryTitle(e.target.value)}
              >
                {categories.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="outlined-select-currency"
                select
                label="Цвет"
                value={color}
                style={{width: 220}}
                onChange={(e) => setColor(e.target.value)}
              >
                {colors.map((option) => (
                  <MenuItem key={option} value={option}>
                    {colorLabels[option]}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </AccordionDetails>
        </Accordion>
        <StonesVariants error={variantsError} setError={setVariantsError} variants={variants} setVariants={setVariants}/>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Картинки</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ImagesList images={images} setImages={setImages} imageError={imageError} setImageError={setImageError}/>
          </AccordionDetails>
        </Accordion>
        <Button sx={{margin: 1}} onClick={update ? updating : send} variant="contained">
          {update ? "Обнавить" : "Добавить"}
        </Button>
      </Box>
  );
};

export default StonesDialog;