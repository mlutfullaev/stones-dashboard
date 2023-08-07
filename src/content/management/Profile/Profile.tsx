import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet-async";
import PageTitleWrapper from "../../../components/PageTitleWrapper";
import {Card, CardContent, Container, Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Dialog from "@mui/material/Dialog";
import ProfileDialog from "./Dialog/ProfileDialog";
import axios from "axios";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import Preview from "@mui/icons-material/Preview";
import DeleteIcon from "@mui/icons-material/Delete";
import {deleting} from "../../../helpers/fetching";
import {siteUrl} from "../../../consts";

type ProfileT = {
  id: number,
  url: string,
  title: string,
  info: string,
  uploadedFile: { id: number, mimetype: string, originalname: string }[]
}

const Profile = () => {
  const [modal, setModal] = useState(false);
  const [profiles, setProfiles] = useState<ProfileT[]>([]);
  const [editingProfile, setEditingProfile] = useState<ProfileT | null>(null);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    axios.get(`${siteUrl}profile`)
      .then((res: { data: ProfileT[] }) => setProfiles(res.data));
  }, []);

  return (
    <>
      <Helmet>
        <title>Портфолио | Админ панель</title>
      </Helmet>
      <PageTitleWrapper>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h3" component="h3" gutterBottom>
            Портфолио
          </Typography>
          <Box style={{display: "flex", gap: 20, alignItems: "center"}}>
            <Typography variant="h4" component="h4" gutterBottom>
              Всего: {profiles.length}
            </Typography>
            <Button variant="outlined" onClick={() => {
              setUpdate(false)
              setModal(true)
            }}>
              Добавить порфолио
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
                <Typography variant="h3" component="h3" gutterBottom>Список работ</Typography>
                <Grid
                  container
                  direction="row"
                  justifyContent="left"
                  alignItems="start"
                  spacing={3}
                  m={"0 auto"}
                >
                  {profiles.map(profile =>
                    <CardContent key={profile.id}>
                      <Card sx={{maxWidth: 345}}>
                        <CardMedia
                          sx={{height: 140}}
                          image={`${siteUrl}upload/fayl/${profile.uploadedFile[0]?.id}`}
                          title="Contemplative Reptile"
                        />
                        <CardContent>
                          <Typography variant="body2" color="text.secondary">
                            {profile.title}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small" startIcon={<EditTwoToneIcon/>} onClick={() => {
                            setEditingProfile(profile);
                            setUpdate(true);
                            setModal(true);
                          }}>Редактировать</Button>
                          <Button size="small" href={profile.url}>Подробнее</Button>
                          <Button size="small" startIcon={<DeleteIcon fontSize="small"/>} onClick={() => deleting('profile/', profile.id, setProfiles)}>Удалить </Button>
                        </CardActions>
                      </Card>
                    </CardContent>)}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Dialog onClose={() => {
        setModal(false)
        setEditingProfile(null)
      }} open={modal}>
        <ProfileDialog update={update} modal={modal} setModal={setModal} editingProfile={editingProfile} setEditingProfile={setEditingProfile} setProfiles={setProfiles}/>
      </Dialog>
    </>
  );
};

export default Profile;