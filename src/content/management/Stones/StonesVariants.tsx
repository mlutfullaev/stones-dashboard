import React, {useState} from 'react';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {IconButton, Typography} from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const StonesVariants = ({variants, setVariants, error, setError}) => {
  const [format, setFormat] = useState<string>("");
  const [product, setProduct] = useState<string>("");
  const [pricerub, setPricerub] = useState<string>("");
  const [priceusd, setPriceusd] = useState<string>("");

  const resetVariant = () => {
    setFormat("");
    setPricerub("");
    setPriceusd("");
    setProduct("");
  };

  const addVariant = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (format && priceusd && pricerub && product) {
      setError(false);
      setVariants(oldVariants => [...oldVariants, {format, pricerub, priceusd, product}]);
      resetVariant();
    } else {
      setError(true);
    }
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon/>}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography>Варианты</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {variants.length ? <Box>
          {variants.map((variant, i) =>
            <Box key={i} style={{display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center"}}>
              <Typography variant="subtitle1">{i + 1}: <b>Изделия: </b>{variant.product}, </Typography>
              <Typography variant="subtitle1"><b>Формат: </b>{variant.format}, </Typography>
              <Typography key={i} variant="subtitle1"><b>Цена RUB: </b>{variant.pricerub}, </Typography>
              <Typography variant="subtitle1"><b>Цена USD: </b>{variant.priceusd}</Typography>
              <IconButton onClick={() => {
                setVariants(oldVariants => oldVariants.filter((item, index) => index !== i));
              }} aria-label="delete">
                <DeleteIcon fontSize="small"/>
              </IconButton>
            </Box>
          )}
        </Box> : null}
        <Box style={{display: "flex", gap: 10, flexWrap: "wrap", paddingBottom: 20}}>
          <TextField
            // required={variants.length ? false : true}
            id="outlined-required"
            label="Изделия"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            error={error && !product}
          />
          <TextField
            // required={variants.length ? false : true}
            id="outlined-required"
            label="Формат"
            value={format}
            error={error && !format}
            onChange={(e) => setFormat(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Цена rub"
            value={pricerub}
            error={error && !pricerub}
            type="number"
            onChange={(e) => setPricerub(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Цена usd"
            value={priceusd}
            error={error && !priceusd}
            type="number"
            onChange={(e) => setPriceusd(e.target.value)}
          />
        </Box>
        <Button variant="outlined" sx={{width: "max-content"}} type="submit" onClick={addVariant}>
          Добавить вариант
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};

export default StonesVariants;