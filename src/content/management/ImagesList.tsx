import React from 'react';
import {Grid} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const ImagesList = ({images, setImages, imageError, setImageError}) => {
  return (
    <Box>
      {images.length ?
        <Grid gap="10px" m="0" container spacing={2}
              style={{alignItems: "start", justifyContent: "left", paddingBottom: 10}}>
          {images.map((img, i) =>
            !img.deleted ?
              <Grid item xs={5.5} key={i} style={{position: "relative", padding: 0}}>
                <Button onClick={() => {
                  setImages(oldImages => {
                    let newArray = [...oldImages]
                    if (img.id) {
                      const index = newArray.findIndex(item => item.file === img.file)
                      newArray[index].deleted = true;
                    } else {
                      newArray = newArray.filter(item => item.file !== img.file)
                    }
                    return newArray
                  })
                }} variant="contained"
                        style={{position: "absolute", top: 10, right: 10, padding: 5, minWidth: 35}}>&times;</Button>
                <img style={{maxHeight: 300, width: "100%"}} src={URL.createObjectURL(img.file)} alt=""/>
              </Grid> : null)}
        </Grid> : null}
      <Box>
        <input type="file" id="image-input" hidden onChange={(e) => {
          setImages(oldImages => [...oldImages, {file: e.target.files[0], id: null, deleted: false}])
          setImageError(false)
        }}/>
        <label htmlFor="image-input" id="label-image-input" style={{
          padding: "8px 20px",
          background: "transparent",
          border: imageError ? '1px solid #FF1943' : "1px solid rgba(85, 105, 255, 0.5)",
          borderRadius: 10,
          color: imageError ? '#FF1943' : "#5569ff",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "0.875rem",
          lineHeight: "1.75"
        }}>
          Добавить картинку
        </label>
      </Box>
    </Box>
  );
};

export default ImagesList;