import {
  Button,
  Card,
  Grid,
  Box,
  CardContent,
  Typography,
  Avatar,
  alpha,
  Tooltip,
  CardActionArea,
  styled
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import {useEffect, useState} from "react";
import axios from "axios";

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    margin: ${theme.spacing(2, 0, 1, -0.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(1)};
    padding: ${theme.spacing(0.5)};
    border-radius: 60px;
    height: ${theme.spacing(5.5)};
    width: ${theme.spacing(5.5)};
    background: ${
      theme.palette.mode === 'dark'
        ? theme.colors.alpha.trueWhite[30]
        : alpha(theme.colors.alpha.black[100], 0.07)
    };
  
    img {
      background: ${theme.colors.alpha.trueWhite[100]};
      padding: ${theme.spacing(0.5)};
      display: block;
      border-radius: inherit;
      height: ${theme.spacing(4.5)};
      width: ${theme.spacing(4.5)};
    }
`
);

const AvatarAddWrapper = styled(Avatar)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[10]};
        color: ${theme.colors.primary.main};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
`
);

const CardAddAction = styled(Card)(
  ({ theme }) => `
        border: ${theme.colors.primary.main} dashed 1px;
        height: 100%;
        color: ${theme.colors.primary.main};
        transition: ${theme.transitions.create(['all'])};
        
        .MuiCardActionArea-root {
          height: 100%;
          justify-content: center;
          align-items: center;
          display: flex;
        }
        
        .MuiTouchRipple-root {
          opacity: .2;
        }
        
        &:hover {
          border-color: ${theme.colors.alpha.black[70]};
        }
`
);

function Wallets() {
  const [stats, setStats] = useState({services: 0,blog: 0,stone: 0,reviews: 0});

  useEffect(() => {
    axios.get("http://1627061-ci09322.twc1.net:3001/models/")
      .then(res => {
        setStats(res.data)
      });
  }, []);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pb: 3
        }}
      >
        <Typography variant="h3">Статистика</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3} item>
          <Card
            sx={{
              px: 1
            }}
          >
            <CardContent>
              <Typography variant="h3" noWrap>
                Камни
              </Typography>
              <Box
                sx={{
                  pt: 3
                }}
              >
                <Typography variant="subtitle2" noWrap>
                  Всего:
                </Typography>
                <Typography variant="h3" gutterBottom noWrap>
                  {stats.stone} штук
                </Typography>
                <Button
                  style={{marginTop: 20}}
                  fullWidth
                  variant="contained" href='/stones'>Перейти</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={3} item>
          <Card
            sx={{
              px: 1
            }}
          >
            <CardContent>
              <Typography variant="h3" noWrap>
                Блог
              </Typography>
              <Box
                sx={{
                  pt: 3
                }}
              >
                <Typography variant="subtitle2" noWrap>
                  Всего:
                </Typography>
                <Typography variant="h3" gutterBottom noWrap>
                  {stats.blog} штук
                </Typography>
                <Button
                  style={{marginTop: 20}}
                  fullWidth
                  variant="contained" href='/blog'>Перейти</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={3} item>
          <Card
            sx={{
              px: 1
            }}
          >
            <CardContent>
              <Typography variant="h3" noWrap>
                Услуги
              </Typography>
              <Box
                sx={{
                  pt: 3
                }}
              >
                <Typography variant="subtitle2" noWrap>
                  Всего:
                </Typography>
                <Typography variant="h3" gutterBottom noWrap>
                  {stats.services} штук
                </Typography>
                <Button
                  style={{marginTop: 20}}
                  fullWidth
                  variant="contained" href='/services'>Перейти</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={3} item>
          <Card
            sx={{
              px: 1
            }}
          >
            <CardContent>
              <Typography variant="h3" noWrap>
                Отзывы
              </Typography>
              <Box
                sx={{
                  pt: 3
                }}
              >
                <Typography variant="subtitle2" noWrap>
                  Всего:
                </Typography>
                <Typography variant="h3" gutterBottom noWrap>
                  {stats.reviews} штук
                </Typography>
                <Button
                  style={{marginTop: 20}}
                  fullWidth
                  variant="contained" href='/reviews'>Перейти</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Wallets;
