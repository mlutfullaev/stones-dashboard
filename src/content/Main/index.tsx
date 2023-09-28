import React from "react";
import {Helmet} from "react-helmet-async";
import PageTitleWrapper from "../../components/PageTitleWrapper";
import PageHeader from "../dashboards/Crypto/PageHeader";
import {Container, Grid} from "@mui/material";
import Stats from "./Stats";

const MainPage = () => {

  return (
    <>
      <Helmet>
        <title>Главная | Админ панель</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <Stats />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MainPage;