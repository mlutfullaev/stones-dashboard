import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet-async";
import PageTitleWrapper from "../../../components/PageTitleWrapper";
import {Card, CardContent, Container, Grid, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import axios from "axios";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import Preview from "@mui/icons-material/Preview";
import DeleteIcon from "@mui/icons-material/Delete";
import {deleting} from "../../../helpers/fetching";
import ServicesDialog from "./ServicesDialog";

type ServiceT = {
  id: number,
  info: string,
  serviceTitle: string
  title: string,
  uploadedFile: { id: number, originalname: string }[],
}

const Services = () => {
  const [modal, setModal] = useState(false);
  const [services, setServices] = useState<ServiceT[]>([]);
  const [editingService, setEditingService] = useState<ServiceT | null>(null);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    axios
      .get("http://45.89.190.203:3001/service")
      .then((res: {data: ServiceT[]}) => setServices(res.data));
  }, []);

  return (
    <>
      <Helmet>
        <title>Услуги | Админ панель</title>
      </Helmet>
      <PageTitleWrapper>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h3" component="h3" gutterBottom>
            Услуги
          </Typography>
          <Box style={{display: "flex", gap: 20, alignItems: "center"}}>
            <Typography variant="h4" component="h4" gutterBottom>
              Всего: {services.length}
            </Typography>
            <Button variant="outlined" onClick={() => {
              setUpdate(false)
              setModal(true)
            }}>
              Добавить услуги
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
                <Typography variant="h3" component="h3" gutterBottom>Список услуг</Typography>
                <Grid
                  container
                  direction="row"
                  justifyContent="left"
                  alignItems="start"
                  spacing={3}
                  m={"0 auto"}
                >
                  {services.length ? services.map(service =>
                    <CardContent key={service.id}>
                      <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                          sx={{ height: 140 }}
                          image={`http://1627061-ci09322.twc1.net:3001/upload/fayl/${service.uploadedFile[0]?.id}`}
                          title="Contemplative Reptile"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">{service.title}</Typography>
                          <Typography variant="body2" color="text.secondary">{service.serviceTitle}</Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small" startIcon={<EditTwoToneIcon/>} onClick={() => {
                            setEditingService(service);
                            setUpdate(true);
                            setModal(true);
                          }}>Редактировать</Button>
                          <Button size="small" startIcon={<Preview/>}
                                  href={`http://vkamne.com/services/${service.id}`}>Подробнее</Button>
                          <Button size="small" startIcon={<DeleteIcon fontSize="small"/>} onClick={() => deleting('service/', service.id, setServices)}>
                            Удалить
                          </Button>
                        </CardActions>
                      </Card>
                    </CardContent>) : null}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Dialog onClose={() => {
        setEditingService(null)
        setUpdate(false)
        setModal(false)
      }} open={modal}>
        <ServicesDialog update={update} setUpdate={setUpdate} modal={modal} setModal={setModal} editingService={editingService} setEditingService={setEditingService} setServices={setServices} />
      </Dialog>
    </>
  );
};

export default Services;