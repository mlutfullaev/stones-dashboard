import React, {Suspense, useEffect, useState, lazy} from "react";
import {Helmet} from "react-helmet-async";
import PageTitleWrapper from "../../../components/PageTitleWrapper";
import {Card, CardContent, Container, Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import StonesDialog from "./StonesDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import Preview from "@mui/icons-material/Preview";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import axios from "axios";
import SuspenseLoader from "../../../components/SuspenseLoader";

type StoneT = {
  title: string,
  abrasion: string,
  uploadedFile: { id: number }[],
  categoryTitle: string,
  country: string,
  otherNames: string,
  density: string,
  radioactivityClass: string,
  waterAbsorption: string,
  similarGranites: string,
  mohsHardness: string,
  id: number,
  variants: { format: string, pricerub: string, priceusd: string, product: string }[],
  createdAt: string
}

const Stones = () => {
  const [modal, setModal] = useState(false);
  const [stones, setStones] = useState<StoneT[]>([]);
  const [editingStone, setEditingStone] = useState<StoneT | null>(null);

  useEffect(() => {
    axios
      .get("http://45.89.190.203:3001/stones")
      .then((res: { data: StoneT[] }) => setStones(res.data));
  }, []);

  const deleteStone = (id) => {
    if (confirm('yes or no')) {
      setStones((oldStones) => oldStones.filter(stone => stone.id !== id))
      axios.delete(`http://1627061-ci09322.twc1.net:3001/stones/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          "Content-type": "application/json",
        }})
    }
  }

  return (
    <>
      <Helmet>
        <title>Камни | Админ панель</title>
      </Helmet>
      <PageTitleWrapper>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h3" component="h3" gutterBottom>
            Камни
          </Typography>
          <Box style={{display: "flex", gap: 20, alignItems: "center"}}>
            <Typography variant="h4" component="h4" gutterBottom>
              Всего: {stones.length}
            </Typography>
            <Button variant="outlined" onClick={() => setModal(true)}>
              Добавить каминь
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
                <Typography variant="h3" component="h3" gutterBottom>Список камней</Typography>
                <Suspense fallback={<SuspenseLoader/>}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="left"
                    alignItems="start"
                    spacing={3}
                    m={"0 auto"}
                  >
                    {stones.length ? stones.map((stone: StoneT, i) =>
                      <CardContent key={i}>
                        <Card sx={{maxWidth: 345}}>
                          <CardMedia
                            sx={{height: 140}}
                            image={`http://1627061-ci09322.twc1.net:3001/upload/fayl/${stone.uploadedFile[0]?.id}`}
                            title="Contemplative Reptile"
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                              {stone.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Категория: {stone.categoryTitle},
                              Страна: {stone.country},
                              Цена: {stone.variants[0].pricerub} ₽/ м2
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button size="small" startIcon={<EditTwoToneIcon/>} onClick={() => {
                              setEditingStone(stone)
                              setModal(true)
                            }}>Редактировать</Button>
                            <Button size="small" startIcon={<Preview/>}
                                    href={`http://vkamne.com/product/${stone.id}`}>Подробнее</Button>
                            <Button size="small" startIcon={<DeleteIcon fontSize="small"/>} onClick={() => deleteStone(stone.id)}>Удалить </Button>
                          </CardActions>
                        </Card>
                      </CardContent>) : null}
                  </Grid>
                </Suspense>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <StonesDialog modal={modal} stone={editingStone} setModal={setModal} setStone={setEditingStone}/>
    </>
  );
};

export default Stones;