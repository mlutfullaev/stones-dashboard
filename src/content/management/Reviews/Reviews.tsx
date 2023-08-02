import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet-async";
import PageTitleWrapper from "../../../components/PageTitleWrapper";
import {Card, CardContent, CardHeader, Container, Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import Dialog from "@mui/material/Dialog";
import ReviewsDialog from "./ReviewsDialog";
import axios from "axios";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteIcon from "@mui/icons-material/Delete";
import {deleting} from "../../../helpers/fetching";
import { siteUrl } from "src/consts";

const rateArray = (rate: number) => {
  const array = [];
  for (let i = 1; i <= rate; i++) {
    array.push(true);
  }
  const notRated = 5 - rate;

  if (notRated) {
    for (let i = 0; i < notRated; i++) {
      array.push(false)
    }
  }
  return array;
}
const Reviews = () => {
  const [modal, setModal] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [update, setUpdate] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`${siteUrl}reviews`)
      .then(res => setReviews(res.data));
  }, []);

  return (
    <>
      <Helmet>
        <title>Отзывы | Админ панель</title>
      </Helmet>
      <PageTitleWrapper>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h3" component="h3" gutterBottom>
            Отзывы
          </Typography>
          <Box style={{display: "flex", gap: 20, alignItems: "center"}}>
            <Typography variant="h4" component="h4" gutterBottom>
              Всего: {reviews.length}
            </Typography>
            <Button variant="outlined" onClick={() => {
              setUpdate(false)
              setModal(true)
            }}>
              Добавить отзыв
            </Button>
          </Box>
        </Grid>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{width: "100%"}}>
                </Box>
                <Typography variant="h3" component="h3" gutterBottom>Список отзывов</Typography>
                <Grid
                  container
                  direction="row"
                  justifyContent="left"
                  alignItems="start"
                  spacing={3}
                  m={"0 auto"}
                >
                  {reviews.length ? reviews.map(review =>
                    <CardContent key={review.id}>
                      <Card sx={{maxWidth: 345}}>
                        <CardHeader
                          // avatar={
                          //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                          //     R
                          //   </Avatar>
                          // }
                          // action={
                          //   <IconButton aria-label="settings">
                          //     <MoreVertIcon />
                          //   </IconButton>
                          // }
                          title={review.name}
                          subheader={rateArray(review.rate).map((rate, i) =>
                            rate ?
                              <svg key={i} width="34" height="31" viewBox="0 0 34 31" fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M17 0L21.4966 10.811L33.168 11.7467L24.2756 19.364L26.9923 30.7533L17 24.65L7.00765 30.7533L9.72442 19.364L0.832039 11.7467L12.5034 10.811L17 0Z"
                                  fill="#F1C644"/>
                              </svg> :
                              <svg key={i} width="34" height="31" viewBox="0 0 34 31" fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M17 2.60396L20.5732 11.1951L20.8078 11.759L21.4166 11.8078L30.6915 12.5514L23.625 18.6045L23.1611 19.0019L23.3029 19.596L25.4618 28.6466L17.5213 23.7966L17 23.4782L16.4787 23.7966L8.53822 28.6466L10.6971 19.596L10.8388 19.0019L10.375 18.6045L3.30855 12.5514L12.5834 11.8078L13.1922 11.759L13.4268 11.1951L17 2.60396Z"
                                  stroke="#F1C644" strokeWidth="2"/>
                              </svg>
                          )}
                        />
                        <CardContent>
                          <Typography variant="body2" color="text.secondary">{review.comment}</Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small" startIcon={<EditTwoToneIcon/>} onClick={() => {
                            setEditingReview(review);
                            setUpdate(true);
                            setModal(true);
                          }}>Редактировать</Button>
                          <Button size="small" startIcon={<DeleteIcon fontSize="small"/>}
                                  onClick={() => deleting('reviews/', review.id, setReviews)}>Удалить </Button>
                        </CardActions>
                      </Card>
                    </CardContent>
                  ) : null}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Dialog onClose={() => {
        setEditingReview(null)
        setModal(false)
        setUpdate(false);
      }} open={modal}>
        <ReviewsDialog update={update} setUpdate={setUpdate} setModal={setModal} modal={modal} editingReview={editingReview}
                       setEditingReview={setEditingReview} setReviews={setReviews}/>
      </Dialog>
    </>
  );
};


export default Reviews;