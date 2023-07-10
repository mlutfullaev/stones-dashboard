import {
  Box,
  Typography,
  Container,
  Button,
} from "@mui/material";
import { Helmet } from "react-helmet-async";

import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router";


const MainContent = styled(Box)(
  ({ theme }) => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

function Status404() {
  let navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) navigate('/')
  }, []);

  const sending = () => {
    if (!user || !password) setError(true);

    axios.post("http://1627061-ci09322.twc1.net:3001/auth/login", {
      username: user,
      password
    })
      .then(res => {
        const time = new Date().getTime() + "";
        setError(false);
        setErrorMessage(false);
        localStorage.setItem("accessToken", res.data.access_token);
        localStorage.setItem("accessTokenTime", time);
        setUser("");
        setPassword("");
        navigate("/");
      })
      .catch(() => setErrorMessage(true));
  };

  return (
    <>
      <Helmet>
        <title>Логин</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="sm">
          <Box style={{display: "flex", flexDirection: "column", gap: 10, paddingTop: 100}}>
            <Typography variant="h3" p="0 0 30px">Логин</Typography>
            <TextField
              required
              value={user}
              id="outlined-required"
              label="Имя"
              onChange={(e) => setUser(e.target.value)}
              error={error && !user}
            />
            <TextField
              required
              id="outlined-password-input"
              value={password}
              label="Пароль"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              error={error && !password}
            />
            {errorMessage ? <Typography style={{textAlign: "center", color: "rgba(187,1,1,0.9)"}} variant="h5">Пользователь не найден</Typography> : null}
            <Button sx={{margin: "30px auto"}} onClick={sending} variant="contained">
              Добавить
            </Button>
          </Box>
        </Container>
      </MainContent>
    </>
  );
}

export default Status404;
