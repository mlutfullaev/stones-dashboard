import React, {useEffect, useState} from "react";
import Dialog from "@mui/material/Dialog";
import {Typography} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import StonesVariants from "./StonesVariants";
import StonesImages from "./StonesImages";
import axios from "axios";
import {patchImg, patching, sending, sendingImg} from "../../../helpers/fetching";
import {createFiles} from "../../../helpers/helpers";

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
  createdAt: string
}

type StonesDialogT = {
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  stone: StoneT | null
  setStone: React.Dispatch<React.SetStateAction<StoneT | null>>
  update: boolean
  setStones: React.Dispatch<React.SetStateAction<StoneT[]>>
}

const StonesDialog: React.FC<StonesDialogT> = ({modal, setModal, stone, setStone, update, setStones}) => {
  const [variants, setVariants] = useState<{
    format: string,
    pricerub: string,
    priceusd: string,
    product: string
  }[]>([]);
  const [images, setImages] = useState([]);
  const [deletingImages, setDeletingImages] = useState([]);
  const [addingImages, setAddingImages] = useState([]);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState(stone ? stone.title : "");
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


  useEffect(() => {
    if (stone) {
      setTitle(stone.title);
      setOtherNames(stone.otherNames || "");
      setDensity(stone.density || "");
      setCountry(stone.country);
      setAbrasion(stone.abrasion || "");
      setWaterAbsorption(stone.waterAbsorption || "");
      setRadioactivityClass(stone.radioactivityClass || "");
      setCategoryTitle(stone.categoryTitle || "");
      setMohsHardness(stone.mohsHardness || "");
      setSimilarGranites(stone.similarGranites || "");
      setVariants(stone.variants || []);
      stone.uploadedFile.forEach((file) => createFiles(file, setImages));
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
      setVariants([]);
      setImages([]);
    }
  }, [modal]);

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
      variants,
    };

    sending("stones/", data)
      .then(stoneRes => {
        if (images.length) {
          images.forEach((img, i) => {
            sendingImg(img)
              .then(imgRes => {
                patchImg(imgRes.data.id, {stoneId: stoneRes.data.id})
                  .then(() => {
                    if (i === images.length - 1) {
                      axios.get(`http://1627061-ci09322.twc1.net:3001/stones/${stoneRes.data.id}`)
                        .then((newStone) => {
                          setStones(oldStones => [...oldStones, newStone.data])
                          setImages([]);
                          setModal(false);
                        })
                    }
                  })
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
    };

    patching(`stones/${stone.id}`, data)
      .then(stoneRes => {
        stone.uploadedFile.forEach((uploadedFile, i) => {
          axios.delete(`http://45.89.190.203:3001/upload/${uploadedFile.id}`)
            .then(() => {
              if (i === stone.uploadedFile.length - 1) {
                if (images.length) {
                  images.forEach((img, i) => {
                    sendingImg(img)
                      .then(imgRes => {
                        patchImg(imgRes.data.id, {stoneId: stoneRes.data.id})
                          .then(() => {
                            if (i === images.length - 1) {
                              setStone(null)
                              setModal(false);
                            }
                          })
                      });
                  });
                }
              }
            })
        })
      });
  };

  return (
    <Dialog onClose={() => {
      setModal(false);
      setStone(null);
    }} open={modal}>
      <Typography variant="h3" style={{textAlign: "center"}}
                  p="20px 20px 0">{update ? "Обнавление камня" : "Добавление камня"}</Typography>
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
            <TextField
              required
              id="outlined-required"
              label="Название категории"
              value={categoryTitle}
              onChange={(e) => setCategoryTitle(e.target.value)}
              error={error && !categoryTitle}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
      <StonesVariants error={variantsError} setError={setVariantsError} variants={variants} setVariants={setVariants}/>
      <StonesImages images={images} setImages={setImages} error={error} setDeletingImages={setDeletingImages}
                    setAddingImages={setAddingImages}/>
      <Button sx={{margin: 1}} onClick={update ? updating : send} variant="contained">
        {update ? "Обнавить" : "Добавить"}
      </Button>
    </Dialog>
  );
};

export default StonesDialog;