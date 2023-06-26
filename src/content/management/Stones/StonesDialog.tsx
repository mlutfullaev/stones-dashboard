import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import {IconButton, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

type StonesDialogT = {
  modal: boolean,
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const StonesDialog: React.FC<StonesDialogT> = ({modal,setModal}) => {
  const [variants, setVariants] = useState<{
    format: string,
    pricerub: string,
    priceusd: string,
    product: string
  }[]>([]);
  const [format, setFormat] = useState<string>("");
  const [product, setProduct] = useState<string>("");
  const [pricerub, setPricerub] = useState<string>("");
  const [priceusd, setPriceusd] = useState<string>("");
  const [error, setError] = useState(false);

  const resetVariant = () => {
    setFormat("");
    setPricerub("");
    setPriceusd("");
    setProduct("");
  };

  return (
    <Dialog onClose={() => setModal(false)} open={modal}>
      <Typography variant="h3" style={{textAlign: "center"}} p="20px 20px 0">Добавление камня</Typography>
      <Box style={{display: "flex", gap: 10, flexWrap: "wrap"}} p="20px">
        <TextField
          required
          id="outlined-required"
          label="Название"
        />
        <TextField
          required
          id="outlined-required"
          label="Месторождение"
        />
        <TextField
          required
          id="outlined-required"
          label="Класс радиоактивности"
        />
        <TextField
          required
          id="outlined-required"
          label="Водопоглощение"
        />
        <TextField
          required
          id="outlined-required"
          label="Плотность"
        />
        <TextField
          required
          id="outlined-required"
          label="Истираемость"
        />
        <TextField
          required
          id="outlined-required"
          label="Другие названия"
        />
        <TextField
          required
          id="outlined-required"
          label="Похожие граниты"
        />
      </Box>
      <Typography variant="h5" p="0 20px">Варианты</Typography>
      {variants.length ? <Box p="10px 20px 0">
        {variants.map((variant, i) =>
          <Box key={i} style={{display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center"}}>
            <Typography variant="subtitle1">{i + 1}: <b>Изделия: </b>{variant.product}, </Typography>
            <Typography variant="subtitle1"><b>Формат: </b>{variant.format}, </Typography>
            <Typography key={i} variant="subtitle1"><b>Цена RUB: </b>{variant.pricerub}, </Typography>
            <Typography variant="subtitle1"><b>Цена USD: </b>{variant.priceusd}</Typography>
            <IconButton onClick={() => {
              setVariants(oldVariants => oldVariants.filter((item, index) => index !== i));
            }} aria-label="delete">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box> : null}
      <form action="">
      <Box style={{display: "flex", gap: 10, flexWrap: "wrap"}} p="20px">
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
      <Button variant="outlined" sx={{margin: "0 20px", width: "max-content"}}
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          if (format && priceusd && pricerub && product) {
            setError(false)
            setVariants(oldVariants => [...oldVariants, {format, pricerub, priceusd, product}]);
            resetVariant();
          } else {
            setError(true)
          }
        }}>
        Добавить вариант
      </Button>
      </form>
    </Dialog>
  );
};

export default StonesDialog;