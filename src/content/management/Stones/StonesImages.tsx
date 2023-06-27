import React, {useEffect, useState} from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Grid, Typography} from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const StonesImages = ({images, setImages}) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Картинки</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid gap='10px' p='10px 0' container spacing={2} style={{alignItems: 'start', justifyContent: 'center'}}>
          {images.length ? images.map((img, i) =>
            <Grid item xs={5.5} key={i} style={{position: 'relative', padding: 0}}>
              <Button onClick={() => setImages(oldImages => oldImages.filter((item, index) => index !== i))} variant="contained" style={{position: 'absolute', top: 10, right: 10, padding: 5, minWidth: 35}}>&times;</Button>
              <img style={{maxHeight: 300, width: '100%'}} src={img} alt=""/>
            </Grid>) : null}
        </Grid>
        <input type="file" id="image-input" hidden onChange={(e) => setImages(oldImages => [...oldImages, URL.createObjectURL(e.target.files[0])])}/>
        <label htmlFor="image-input" id="label-image-input" style={{
          padding: "8px 20px",
          marginTop: 20,
          background: "transparent",
          border: "1px solid rgba(85, 105, 255, 0.5)",
          borderRadius: 10,
          color: "#5569ff",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "0.875rem",
          lineHeight: "1.75"
        }}>
          Добавить картинку
        </label>
      </AccordionDetails>
    </Accordion>
  );
};

export default StonesImages;