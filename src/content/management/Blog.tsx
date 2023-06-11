import React, {useState} from 'react';
import {Helmet} from "react-helmet-async";
import PageTitleWrapper from "../../components/PageTitleWrapper";
import {Card, CardContent, Container, Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

const Blog = () => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <Helmet>
        <title>Блог | Админ панель</title>
      </Helmet>
      <PageTitleWrapper>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h3" component="h3" gutterBottom>
            Блог
          </Typography>
          <Button variant="outlined" onClick={() => setModal(true)}>
            Добавить статью
          </Button>
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
                <Typography variant="h3" component="h3" gutterBottom>Список статьей</Typography>
                <Grid
                  container
                  direction="row"
                  justifyContent="left"
                  alignItems="start"
                  spacing={3}
                  m={'0 auto'}
                >
                  <CardContent>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        sx={{ height: 140 }}
                        image="/static/images/placeholders/covers/6.jpg"
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Lizards are a widespread group of squamate reptiles, with
                          over 6,000 species, ranging across all continents except
                          Antarctica
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                      </CardActions>
                    </Card>
                  </CardContent>
                  <CardContent>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        sx={{ height: 140 }}
                        image="/static/images/placeholders/covers/6.jpg"
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Lizards are a widespread group of squamate reptiles, with
                          over 6,000 species, ranging across all continents except
                          Antarctica
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                      </CardActions>
                    </Card>
                  </CardContent>
                  <CardContent>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        sx={{ height: 140 }}
                        image="/static/images/placeholders/covers/6.jpg"
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Lizards are a widespread group of squamate reptiles, with
                          over 6,000 species, ranging across all continents except
                          Antarctica
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                      </CardActions>
                    </Card>
                  </CardContent>
                  <CardContent>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        sx={{ height: 140 }}
                        image="/static/images/placeholders/covers/6.jpg"
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Lizards are a widespread group of squamate reptiles, with
                          over 6,000 species, ranging across all continents except
                          Antarctica
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                      </CardActions>
                    </Card>
                  </CardContent>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Dialog onClose={() => setModal(false)} open={modal}>
        <DialogTitle>Добавление новой статьи</DialogTitle>
      </Dialog>
    </>
  );
};

export default Blog;