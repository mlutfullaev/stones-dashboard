import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import {siteUrl} from "../../../consts";
import ImagesList from "../../management/ImagesList";
import {deletingBD, patchImg, patching, sending, sendingImg} from "../../../helpers/fetching";
import {updateArray} from "../../../helpers/helpers";

const YoutubeForm = ({setModal}) => {
  const [url, setUrl] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    axios.get(`${siteUrl}youtube`)
      .then(res => {
        console.log(res.data)
      })
  }, []);

  const update = () => {
    if (!url) return setError(true);
    patching(`youtube/2`, {url})
      .then(sliderRes => {
        setUrl('');
        setError(false);
        setModal(false)
      })
  }

  return (
    <Box p={2}>
      <Typography variant="h3" style={{textAlign: "center"}} p="10px 20px 20px">
        Обнавление ютуб видео
      </Typography>
      <Box style={{display: "flex", gap: 10, flexDirection: "column"}}>
        <TextField
          required
          id="outlined-required"
          label="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          error={error && !url}
        />
      </Box>
      <Button sx={{margin: 1}} onClick={update} variant="contained">
        Обнавить
      </Button>
    </Box>
  );
};

export default YoutubeForm;