import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Import your firebase config
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  CssBaseline,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControl,
  FormLabel,
  Slider
} from '@mui/material';

const FundersProfileSetup = ({ userId }) => {
  const formik = useFormik({
    initialValues: {
      investmentRange: [10000, 100000],
      interestedIn: [],
      about: '',
      previouslyInvested: [{ name: '', type: '' }],
    },
    validationSchema: Yup.object({
      investmentRange: Yup.array().min(1, 'Select at least one investment range'),
      interestedIn: Yup.array().min(1, 'Select at least one startup type'),
      about: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await updateDoc(doc(db, 'users', userId), {
          ...values,
        });

        // Redirect to another page
        window.location.href = '/login';
      } catch (error) {
        console.error('Error updating profile:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;
    if (checked) {
      formik.setFieldValue('interestedIn', [...formik.values.interestedIn, value]);
    } else {
      formik.setFieldValue('interestedIn', formik.values.interestedIn.filter((i) => i !== value));
    }
  };

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
        <Typography component="h1" variant="h5">
          Funder's Profile Setup
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
        <FormControl fullWidth margin="normal">
            <FormLabel>Investment Range</FormLabel>
            <Slider
              name="investmentRange"
              value={formik.values.investmentRange}
              onChange={(e, newValue) => formik.setFieldValue('investmentRange', newValue)}
              valueLabelDisplay="auto"
              min={1000}
              max={1000000}
              step={1000}
            />
            {formik.errors.investmentRange && (
              <Typography color="error">{formik.errors.investmentRange}</Typography>
            )}
          </FormControl>

          <FormGroup>
            <Typography variant="body1">Types of Startups Interested In:</Typography>
            {['Tech', 'Health', 'Finance'].map((type) => (
              <FormControlLabel
                key={type}
                control={
                  <Checkbox
                    value={type.toLowerCase()}
                    onChange={handleCheckboxChange}
                    checked={formik.values.interestedIn.includes(type.toLowerCase())}
                  />
                }
                label={type}
              />
            ))}
          </FormGroup>
          {formik.touched.interestedIn && formik.errors.interestedIn && (
            <Typography color="error">{formik.errors.interestedIn}</Typography>
          )}
          <TextField
            name="about"
            label="About"
            fullWidth
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.about}
            error={formik.touched.about && Boolean(formik.errors.about)}
            helperText={formik.touched.about && formik.errors.about}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={formik.isSubmitting}
            sx={{ mt: 3, mb: 2 }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default FundersProfileSetup;

