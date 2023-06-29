import React, {useEffect, useState} from "react";
import Dialog from "@mui/material/Dialog";
import {IconButton, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import StonesVariants from "./StonesVariants";
import StonesImages from "./StonesImages";

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
}

const StonesDialog: React.FC<StonesDialogT> = ({modal, setModal, stone, setStone}) => {
  const [variants, setVariants] = useState<{
    format: string,
    pricerub: string,
    priceusd: string,
    product: string
  }[]>([]);
  const [images, setImages] = useState([]);
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
      setTitle(stone.title)
      setOtherNames(stone.otherNames || '')
      setDensity(stone.density || '')
      setCountry(stone.country)
      setAbrasion(stone.abrasion || '')
      setWaterAbsorption(stone.waterAbsorption || '')
      setRadioactivityClass(stone.radioactivityClass || '')
      setCategoryTitle(stone.categoryTitle || '')
      setMohsHardness(stone.mohsHardness || '')
      setSimilarGranites(stone.similarGranites || '')
      setVariants(stone.variants || [])
    } else {
      setTitle('')
      setOtherNames('')
      setDensity('')
      setCountry('')
      setAbrasion('')
      setWaterAbsorption('')
      setRadioactivityClass('')
      setCategoryTitle('')
      setMohsHardness('')
      setSimilarGranites('')
      setVariants([])
    }
  }, [modal]);

  return (
    <Dialog onClose={() => {
      setModal(false);
      setStone(null);
    }} open={modal}>
      <Typography variant="h3" style={{textAlign: "center"}} p="20px 20px 0">Добавление камня</Typography>
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
              error={error && !radioactivityClass}
            />
            <TextField
              id="outlined-required"
              label="Водопоглощение"
              value={waterAbsorption}
              onChange={(e) => setWaterAbsorption(e.target.value)}
              error={error && !waterAbsorption}
            />
            <TextField
              id="outlined-required"
              label="Плотность"
              value={density}
              onChange={(e) => setDensity(e.target.value)}
              error={error && !density}
            />
            <TextField
              id="outlined-required"
              label="Истираемость"
              value={abrasion}
              onChange={(e) => setAbrasion(e.target.value)}
              error={error && !abrasion}
            />
            <TextField
              required
              id="outlined-required"
              label="Другие названия"
              value={otherNames}
              onChange={(e) => setOtherNames(e.target.value)}
              error={error && !otherNames}
            />
            <TextField
              required
              id="outlined-required"
              label="Похожие граниты"
              value={similarGranites}
              onChange={(e) => setSimilarGranites(e.target.value)}
              error={error && !similarGranites}
            />
            <TextField
              required
              id="outlined-required"
              label="Название категории"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={error && !title}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
      <StonesVariants error={variantsError} setError={setVariantsError} variants={variants} setVariants={setVariants} />
      <StonesImages images={images} setImages={setImages} />
      <Button sx={{ margin: 1 }} variant="contained">
        Добавить
      </Button>
    </Dialog>
  );
};

export default StonesDialog;