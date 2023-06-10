import React, {SyntheticEvent, useState} from "react";
import {Helmet} from "react-helmet-async";
import PageTitleWrapper from "../../components/PageTitleWrapper";
import {Card, CardContent, CardHeader, Container, Divider, Grid, Typography} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {TabPanel} from "../pages/Components/Tabs";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const Services = () => {
  const [tabs, setTabs] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTabs(newValue);
  };

  return (
    <>
      <Helmet>
        <title>Услуги | Админ панель</title>
      </Helmet>
      <PageTitleWrapper>
        <Typography variant="h3" component="h3" gutterBottom>
          Услуги
        </Typography>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Card>
          <Grid>
          </Grid>
        </Card>
      </Container>
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
                  <Tabs
                    variant="scrollable"
                    scrollButtons="auto"
                    textColor="primary"
                    indicatorColor="primary"
                    value={tabs}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="Item One" {...a11yProps(0)} />
                    <Tab label="Item Two" {...a11yProps(1)} />
                  </Tabs>
                  <TabPanel value={tabs} index={0}>
                    Item One
                  </TabPanel>
                  <TabPanel value={tabs} index={1}>
                    Item Two
                  </TabPanel>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Services;