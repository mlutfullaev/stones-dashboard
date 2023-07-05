import React from 'react';
import {Grid} from "@mui/material";
import Button from "@mui/material/Button";

const ImagesList = ({images, setImages}) => {
  return (
    <Grid gap="10px" m="0" container spacing={2} style={{alignItems: "start", justifyContent: "left"}}>
      {images.length ? images.map((img, i) =>
        <Grid item xs={5.5} key={i} style={{position: "relative", padding: 0}}>
          <Button onClick={() => setImages(oldImages => oldImages.filter((item, index) => index !== i))} variant="contained" style={{position: "absolute", top: 10, right: 10, padding: 5, minWidth: 35}}>&times;</Button>
          <img style={{maxHeight: 300, width: "100%"}} src={URL.createObjectURL(img)} alt=""/>
        </Grid>) : null}
    </Grid>
  );
};

export default ImagesList;