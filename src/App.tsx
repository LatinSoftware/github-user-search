import { Container, Grid, Stack } from '@mui/material'
import { Search } from './components/Search'
import { RepoInformation } from './components/RepoInformation'
import { CircleButtonIcon } from './components/CircleButtonIcon'
import User from './components/User'
import { Detail } from './components/Detail'

import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TwitterIcon from '@mui/icons-material/Twitter';

import './App.css'

function App() {

  return (
    <Container maxWidth="sm" style={{ padding: '2rem' }} >
      <Grid container
        spacing={5}
        alignItems='center'
        alignContent='center'
        justifyContent='center'
      >
        <Grid item xs={12}>
          <Search />
        </Grid>
        <Grid item xs={12}>
          <Stack alignItems='center'>
            <User />
          </Stack>
        </Grid>
        <Grid item>
          <Detail />
        </Grid>
        <Grid item>
          <Stack direction='row' spacing={5}>
            <RepoInformation />
            <RepoInformation />
            <RepoInformation />
          </Stack>
        </Grid>
        <Grid item>
          <Stack direction='row' spacing={3}>
            <CircleButtonIcon>
                <GitHubIcon fontSize='inherit' />
            </CircleButtonIcon>
            <CircleButtonIcon>
                <LanguageIcon fontSize='inherit' />
            </CircleButtonIcon>
            <CircleButtonIcon>
                <LocationOnIcon fontSize='inherit' />
            </CircleButtonIcon>
            <CircleButtonIcon>
                <TwitterIcon fontSize='inherit' />
            </CircleButtonIcon>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
