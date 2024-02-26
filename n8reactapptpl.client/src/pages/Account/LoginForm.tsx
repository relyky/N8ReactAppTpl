import { useEffect, useState } from 'react'
import type { FC, FormEvent } from 'react'
import { useNavigate } from "react-router-dom"
import { Avatar, TextField, FormControlLabel, Checkbox, Link, Box, Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginAsync, selectAuthed, selectAuthing } from '../../store/accountSlice';
import { postData } from '../../tools/httpHelper';
import { ILoginArgs } from '../../DTO/Account/ILoginArgs';
// icons
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

const Copyright: FC = () => (
  <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
    {'Copyright © '}
    <Link color="inherit" href="https://mui.com/">
      Your Website
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
)

export default function LoginForm() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuthed = useAppSelector(selectAuthed)
  const isAuthing = useAppSelector(selectAuthing)
  const [apiKey, setApiKey] = useState('nil')

  useEffect(() => {
    postData<MsgObj>('api/Account/GetApiKey')
      .then(m => setApiKey(m.message))
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget);
    const loginArgs: ILoginArgs = {
      userId: data.get('userId') as string,
      credential: data.get('mima') as string,
      vcode: '123456'
    };

    dispatch(loginAsync({ loginArgs, apiKey }))
  };

  //# 成功後轉址到主畫面
  useEffect(() => {
    if (isAuthed === true)
      navigate('/')
  }, [isAuthed, navigate])

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="帳號"
          name="userId"
          autoComplete="userid"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="mima"
          label="密碼"
          type="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="Y" name="remember" color="primary" />}
          label="Remember me"
        />
        <LoadingButton loading={isAuthing}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          登入
        </LoadingButton>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
        <Copyright />
      </Box>
    </Box>
  );
}