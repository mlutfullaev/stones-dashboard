import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {patching, sending} from "../../../helpers/fetching";
import {updateArray} from "../../../helpers/helpers";

const ReviewsDialog = ({update, setUpdate, setModal, modal, editingReview, setEditingReview, setReviews}) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState(false);
  const [rate, setRate] = useState<string>('');

  const send = () => {
    if (!name || !comment || +rate < 1 || +rate > 5) return setError(true)
    const data = {
      name,
      comment,
      rate: +rate
    }

    sending('reviews/', data)
      .then(res => {
        setModal(false)
        setReviews(oldReviews => [...oldReviews, res.data])
      })
  };

  const updating = () => {
    if (!name || !comment || +rate < 1 || +rate > 5) return setError(true)
    const data = {
      name,
      comment,
      rate: +rate
    }

    patching(`reviews/${editingReview.id}`, data)
      .then(res => {
        setEditingReview(null)
        setUpdate(false)
        setModal(false)
        updateArray(setReviews, res.data)
      })
  };

  useEffect(() => {
    if (editingReview) {
      setName(editingReview.name || '')
      setComment(editingReview.comment || '')
      setRate(editingReview.rate || '')
    } else {
      setName('');
      setComment('');
      setRate('')
    }
  }, [modal]);

  return (
    <Box p={2}>
      <Typography variant="h3" style={{textAlign: "center"}} p="10px 20px 20px">{update ? "Обнавление блога" : "Добавление блога"}</Typography>
      <Box style={{display: "flex", gap: 10, flexDirection: "column"}}>
        <TextField
          required
          id="outlined-required"
          label="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={error && !name}
        />
        <TextField
          required
          id="outlined"
          label="Комментария"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          error={error && !comment}
        />
        <TextField
          required
          id="outlined"
          label="Оценка"
          type="number"
          maxRows={5}
          minRows={1}
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          error={error && !rate || error && +rate < 1 || error && +rate > 5}
        />
        <Button sx={{margin: 1}} onClick={update ? updating : send} variant="contained">
          {update ? "Обнавить" : "Добавить"}
        </Button>
      </Box>
    </Box>
  );
};

export default ReviewsDialog;