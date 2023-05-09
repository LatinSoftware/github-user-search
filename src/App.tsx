import { Box, Container, Grid, Skeleton, Stack } from '@mui/material'
import { Search } from './components/Search'
import { RepoInformation } from './components/RepoInformation'
import { CircleButtonIcon } from './components/CircleButtonIcon'
import { Detail } from './components/Detail'
import { GitHubUserMachine } from './machines/GitHubUserFetchMachine'
import User from './components/User'

import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TwitterIcon from '@mui/icons-material/Twitter';

import './App.css'
import { Fragment, useState } from 'react'
import { useMachine } from '@xstate/react'

function App() {

  const [state, send] = useMachine(GitHubUserMachine);

  const { user } = state.context;

  const [value, setValue] = useState('');

  const handleButton = () => {
    send('FILL', { searchValue: value })
    setValue('')
  }

  return (
    <Fragment>
      <div className='upper-background__color' />
      <Container maxWidth="sm" style={{ padding: '2rem' }} >
        <Grid container
          spacing={5}
          justifyContent='center'
          
        >
          <Grid item xs={12} >
            <Search value={value} setValue={setValue} onClick={handleButton} />
          </Grid>
          <Grid item>
            <Stack alignItems='center'>
              {!state.matches('loading') ?
                <User image={user?.avatar_url} />
                :
                <Skeleton variant='circular' animation='wave' width={300} height={300} />
              }
            </Stack>
          </Grid>
          <Grid item>
            {!state.matches('loading') ?
              <Detail user={user} />
              :
              <Fragment>
                <Skeleton width={180} height={20} animation='wave' />
                <Skeleton width={50} height={10} animation='wave' />
                <Box sx={{ width: '90vw' }} >
                  <Skeleton animation='wave' />
                  <Skeleton animation='wave' />
                  <Skeleton animation='wave' />
                </Box>
              </Fragment>

            }
          </Grid>
          <Grid item>
            <Stack direction='row' spacing={5}>
              {
                !state.matches('loading') ?
                  <Fragment>
                    <RepoInformation name='Repos' qty={user !== undefined ? user?.public_repos + user?.total_private_repos : 0} />
                    <RepoInformation name='Followers' qty={user !== undefined ? user?.followers : 0} />
                    <RepoInformation name='Following' qty={user !== undefined ? user?.following : 0} />
                  </Fragment>
                  :
                  <Fragment>
                    <Skeleton animation='wave' width={60} height={100} />
                    <Skeleton animation='wave' width={60} height={100} />
                    <Skeleton animation='wave' width={60} height={100} />
                  </Fragment>
              }
            </Stack>
          </Grid>
          <Grid item >
            <Stack direction='row' spacing={3}>
              {
                !state.matches('loading') ?
                  <Fragment>
                    <CircleButtonIcon
                      disabled={user?.twitter_username == undefined ? true : false}
                    >
                      <GitHubIcon fontSize='inherit' />
                    </CircleButtonIcon>
                    <CircleButtonIcon
                      disabled={user?.company == undefined ? true : false}
                      description={user?.company}
                      color='var(--clr-4)'>
                      <LanguageIcon fontSize='inherit' />
                    </CircleButtonIcon>
                    <CircleButtonIcon
                      disabled={user?.location == undefined ? true : false}
                      description={user?.location}
                      color='green'>
                      <LocationOnIcon fontSize='inherit' />
                    </CircleButtonIcon>
                    <CircleButtonIcon
                      disabled={user?.twitter_username == undefined ? true : false}
                      description={user?.twitter_username}
                      color='var(--clr-5)'>
                      <TwitterIcon fontSize='inherit' />
                    </CircleButtonIcon>
                  </Fragment>
                  :
                  <Fragment>
                    <Skeleton animation='wave' variant='circular' width={60} height={60} />
                    <Skeleton animation='wave' variant='circular' width={60} height={60} />
                    <Skeleton animation='wave' variant='circular' width={60} height={60} />
                    <Skeleton animation='wave' variant='circular' width={60} height={60} />
                  </Fragment>
              }
            </Stack>
          </Grid>
        </Grid>

      </Container>
    </Fragment>

  )
}

export default App
