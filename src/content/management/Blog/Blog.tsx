import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet-async";
import PageTitleWrapper from "../../../components/PageTitleWrapper";
import {Card, CardContent, Container, Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Dialog from "@mui/material/Dialog";
import BlogDialog from "./Dialog/BlogDialog";
import axios from "axios";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import Preview from "@mui/icons-material/Preview";
import DeleteIcon from "@mui/icons-material/Delete";
import {deleting} from "../../../helpers/fetching";
import {siteUrl} from "../../../consts";

type BlogT = {
  id: number,
  blogUrl: string,
  title: string,
  uploadedFile: { id: number, mimetype: string, originalname: string }[]
}

const Blog = () => {
  const [modal, setModal] = useState(false);
  const [blogs, setBlogs] = useState<BlogT[]>([]);
  const [editingBLog, setEditingBLog] = useState<BlogT | null>(null);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    axios.get(`${siteUrl}blog`)
      .then((res: { data: BlogT[] }) => setBlogs(res.data));
  }, []);

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
          <Box style={{display: "flex", gap: 20, alignItems: "center"}}>
            <Typography variant="h4" component="h4" gutterBottom>
              Всего: {blogs.length}
            </Typography>
            <Button variant="outlined" onClick={() => {
              setUpdate(false)
              setModal(true)
            }}>
              Добавить статью
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
                <Typography variant="h3" component="h3" gutterBottom>Список статьей</Typography>
                <Grid
                  container
                  direction="row"
                  justifyContent="left"
                  alignItems="start"
                  spacing={3}
                  m={"0 auto"}
                >
                  {blogs.map(blog =>
                    <CardContent key={blog.id}>
                      <Card sx={{maxWidth: 345}}>
                        <CardMedia
                          sx={{height: 140}}
                          image={`${siteUrl}upload/fayl/${blog.uploadedFile[0]?.id}`}
                          title="Contemplative Reptile"
                        />
                        <CardContent>
                          <Typography variant="body2" color="text.secondary">
                            {blog.title}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small" startIcon={<EditTwoToneIcon/>} onClick={() => {
                            setEditingBLog(blog);
                            setUpdate(true);
                            setModal(true);
                          }}>Редактировать</Button>
                          <Button size="small" href={blog.blogUrl}>Подробнее</Button>
                          <Button size="small" startIcon={<DeleteIcon fontSize="small"/>} onClick={() => deleting('blog/', blog.id, setBlogs)}>Удалить </Button>
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
        setEditingBLog(null)
      }} open={modal}>
        <BlogDialog update={update} modal={modal} setModal={setModal} editingBlog={editingBLog} setEditingBlog={setEditingBLog} setBlogs={setBlogs}/>
      </Dialog>
    </>
  );
};

export default Blog;