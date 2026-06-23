import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Alert
} from '@mui/material'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '@/Redux/hooks'
import { loginSlice } from '@/Redux/slices/authSlice'
// import GoogleIcon from ''
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { FaGoogle } from 'react-icons/fa'

export const LoginPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { status, error } = useAppSelector(state => state.auth)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await dispatch(loginSlice({ email, password }))
    if (loginSlice.fulfilled.match(result)) {
      navigate('/')
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google/login'
  }

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      fontFamily: 'Cairo',
      color: '#e9dff1',
      borderRadius: 2,
      '& fieldset': { borderColor: '#3d2d4e' },
      '&:hover fieldset': { borderColor: '#c084fc' },
      '&.Mui-focused fieldset': { borderColor: '#c084fc' }
    },
    '& .MuiInputLabel-root': {
      fontFamily: 'Cairo',
      color: '#a89fb3',
      '&.Mui-focused': { color: '#c084fc' }
    },
    '& .MuiInputAdornment-root .MuiIconButton-root': {
      color: '#a89fb3'
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#0f0b14',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        direction: 'rtl',
        py: 6
      }}
    >
      {/* Decorative blobs */}
      <Box
        sx={{
          position: 'fixed',
          top: '-10%',
          right: '-5%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(192,132,252,0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />
      <Box
        sx={{
          position: 'fixed',
          bottom: '-10%',
          left: '-5%',
          width: 350,
          height: 350,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(147,51,234,0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <Container maxWidth='xs'>
        {/* Logo / Brand */}
        <Box textAlign='center' mb={4}>
          <Typography
            variant='h3'
            sx={{
              fontFamily: 'Cairo',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #c084fc, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            أوركيد
          </Typography>
          <Typography
            sx={{ fontFamily: 'Cairo', color: '#a89fb3', mt: 0.5, fontSize: '0.95rem' }}
          >
            مرحباً بعودتك — سجّل دخولك لتتابع القصص
          </Typography>
        </Box>

        {/* Card */}
        <Box
          component='form'
          onSubmit={handleSubmit}
          sx={{
            bgcolor: '#18121f',
            borderRadius: 4,
            p: 4,
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            border: '1px solid #2a1f35',
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5
          }}
        >
          <Typography
            variant='h5'
            sx={{ fontFamily: 'Cairo', fontWeight: 700, color: '#f3d9fa', textAlign: 'center' }}
          >
            تسجيل الدخول
          </Typography>

          {error && status === 'failed' && (
            <Alert
              severity='error'
              sx={{
                fontFamily: 'Cairo',
                bgcolor: 'rgba(211,47,47,0.15)',
                color: '#f48fb1',
                border: '1px solid rgba(211,47,47,0.3)',
                '& .MuiAlert-icon': { color: '#f48fb1' }
              }}
            >
              {error}
            </Alert>
          )}

          <TextField
            id='login-email'
            label='البريد الإلكتروني'
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            fullWidth
            variant='outlined'
            sx={inputStyles}
          />

          <TextField
            id='login-password'
            label='كلمة المرور'
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            fullWidth
            variant='outlined'
            sx={inputStyles}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    onClick={() => setShowPassword(prev => !prev)}
                    edge='end'
                    aria-label='toggle password visibility'
                  >
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Button
            id='login-submit-btn'
            type='submit'
            variant='contained'
            disabled={status === 'loading'}
            fullWidth
            sx={{
              fontFamily: 'Cairo',
              fontWeight: 700,
              fontSize: '1rem',
              py: 1.5,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #9333ea, #c084fc)',
              boxShadow: '0 4px 20px rgba(192,132,252,0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #7e22ce, #a855f7)',
                boxShadow: '0 6px 24px rgba(192,132,252,0.4)'
              },
              '&:disabled': {
                background: '#3d2d4e',
                color: '#6b5b7b'
              },
              transition: 'all 0.3s ease'
            }}
          >
            {status === 'loading' ? (
              <CircularProgress size={22} sx={{ color: '#e9dff1' }} />
            ) : (
              'دخول'
            )}
          </Button>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ flex: 1, height: '1px', bgcolor: '#2a1f35' }} />
            <Typography sx={{ fontFamily: 'Cairo', color: '#6b5b7b', fontSize: '0.8rem' }}>
              أو
            </Typography>
            <Box sx={{ flex: 1, height: '1px', bgcolor: '#2a1f35' }} />
          </Box>

          <Button
            id='google-login-btn'
            variant='outlined'
            fullWidth
            startIcon={<FaGoogle />}
            onClick={handleGoogleLogin}
            sx={{
              fontFamily: 'Cairo',
              fontWeight: 600,
              py: 1.3,
              borderRadius: 2,
              color: '#e9dff1',
              borderColor: '#3d2d4e',
              direction: 'ltr',
              '&:hover': {
                borderColor: '#c084fc',
                bgcolor: 'rgba(192,132,252,0.08)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            الدخول عبر Google
          </Button>
        </Box>

        {/* Footer link */}
        <Box textAlign='center' mt={3}>
          <Typography sx={{ fontFamily: 'Cairo', color: '#a89fb3', fontSize: '0.9rem' }}>
            ليس لديك حساب؟{' '}
            <NavLink
              to='/register'
              style={{ color: '#c084fc', fontWeight: 700, textDecoration: 'none' }}
            >
              إنشاء حساب جديد
            </NavLink>
          </Typography>
        </Box>

        <Box textAlign='center' mt={1.5}>
          <NavLink to='/' style={{ color: '#6b5b7b', fontFamily: 'Cairo', fontSize: '0.85rem' }}>
            العودة إلى الصفحة الرئيسية
          </NavLink>
        </Box>
      </Container>
    </Box>
  )
}

export default LoginPage