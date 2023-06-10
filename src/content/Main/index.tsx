import React from 'react';
import {Helmet} from "react-helmet-async";
import PageTitleWrapper from "../../components/PageTitleWrapper";
import PageHeader from "../dashboards/Crypto/PageHeader";
import {Container, Grid} from "@mui/material";
import AccountBalance from "../dashboards/Crypto/AccountBalance";
import Wallets from "../dashboards/Crypto/Wallets";
import AccountSecurity from "../dashboards/Crypto/AccountSecurity";
import WatchList from "../dashboards/Crypto/WatchList";
import Footer from "../../components/Footer";

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
            <AccountBalance />
          </Grid>
          <Grid item lg={8} xs={12}>
            <Wallets />
          </Grid>
          <Grid item lg={4} xs={12}>
            <AccountSecurity />
          </Grid>
          <Grid item xs={12}>
            <WatchList />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MainPage;