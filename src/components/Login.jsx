import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth,db } from '../firebase';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  CssBaseline,
  Avatar,
  Grid,
  Link,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import {doc, getDoc } from "firebase/firestore";
import { fetchUserStart, fetchUserSuccess, fetchUserFailure, setLogin } from '../states/userSlice';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';


const LoginPage = () => {
  const dispatch = useDispatch();
  const AccountType = useSelector((state) => state.user.accountType);

  useEffect(() => {
    if (AccountType) {
      console.log('A/C type from state:', AccountType);
    }
  }, [AccountType]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        dispatch(fetchUserStart());
        const userCredentials= await signInWithEmailAndPassword(auth, values.email, values.password);

        const userID = userCredentials.user.uid;

        const userDocRef = doc(db, 'users', userID);
        const userDoc = await getDoc(userDocRef);
    
        if (userDoc.exists()) {
          // Store user data in a variable or state as needed
          const userData = userDoc.data();
          console.log('User data:', userData);
          console.log('A/C TYPE:', userData.accountType);

        //  dispatch(setLogin({
        //    data: userData,
        //    accountType: userData.accountType,
        //  }));

        localStorage.setItem('userData', JSON.stringify(userData));



        // Redirect to dashboard or home page after successful logi
        window.location.href = '/';

      } else {
        console.error('No such user data in Firestore!');
        dispatch(fetchUserFailure('No user data found. Please contact support.'));
        setErrors({ submit: 'No user data found. Please contact support.' });
      }

      } catch (error) {
        console.error('Error logging in:', error);
        setErrors({ submit: 'Invalid email or password' });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          {formik.errors.submit && (
            <Typography color="error" variant="body2">
              {formik.errors.submit}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={formik.isSubmitting}
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;


