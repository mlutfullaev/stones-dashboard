import React, {useEffect, useState} from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Grid, Typography} from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ImagesList from "../ImagesList";

const StonesImages = ({images, setImages, error}) => {
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
        <ImagesList images={images} setImages={setImages} />
        <Box style={{paddingTop: 20}}>
          <input type="file" id="image-input" hidden onChange={(e) => {
            setImages(oldImages => [...oldImages, e.target.files[0]])
            console.log(e.target.files[0])
          }}/>
          <label htmlFor="image-input" id="label-image-input" style={{
            padding: "8px 20px",
            background: "transparent",
            border: error && !images.length ? '1px solid #FF1943': "1px solid rgba(85, 105, 255, 0.5)",
            borderRadius: 10,
            color: error && !images.length ? '#FF1943' : "#5569ff",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "0.875rem",
            lineHeight: "1.75"
          }}>
            Добавить картинку
          </label>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default StonesImages;