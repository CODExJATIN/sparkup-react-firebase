import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { storage, db } from '../../firebase';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  CssBaseline,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Slider,
  Grid
} from '@mui/material';

const StartupProfileSetup = ({ userId }) => {
  const [documents, setDocuments] = useState([]);
  const [docUrls, setDocUrls] = useState([]);

  const formik = useFormik({
    initialValues: {
      startupName: '',
      description: '',
      type: '',
      employees: '',
      investmentAmount: [10000, 50000],
      keyPeople: [{ name: '', position: '' }],
    },
    validationSchema: Yup.object({
      startupName: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      type: Yup.string().required('Required'),
      employees: Yup.string().required('Required'),
      investmentAmount: Yup.array().min(2).required('Required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const docRefs = [];
        for (let doc of documents) {
          const docRef = ref(storage, `documents/${userId}/${doc.name}`);
          await uploadBytes(docRef, doc);
          const docUrl = await getDownloadURL(docRef);
          docRefs.push({ name: doc.name, url: docUrl });
        }

        await updateDoc(doc(db, 'users', userId), {
          ...values,
          documents: docRefs,
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

  const handleDocChange = (e) => {
    setDocuments([...documents, ...e.target.files]);
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
          Startup Profile Setup
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <TextField
            name="startupName"
            label="Startup Name"
            fullWidth
            variant="outlined"
            margin="normal"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.startupName}
            error={formik.touched.startupName && Boolean(formik.errors.startupName)}
            helperText={formik.touched.startupName && formik.errors.startupName}
          />
          <TextField
            name="description"
            label="Description"
            fullWidth
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Type of Startup</InputLabel>
            <Select
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Type of Startup"
              error={formik.touched.type && Boolean(formik.errors.type)}
            >
              <MenuItem value="tech">Tech</MenuItem>
              <MenuItem value="health">Health</MenuItem>
              <MenuItem value="finance">Finance</MenuItem>
              {/* Add more options as needed */}
            </Select>
          </FormControl>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>No. of Employees</InputLabel>
            <Select
              name="employees"
              value={formik.values.employees}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="No. of Employees"
              error={formik.touched.employees && Boolean(formik.errors.employees)}
            >
              <MenuItem value="1-10">1-10</MenuItem>
              <MenuItem value="11-50">11-50</MenuItem>
              <MenuItem value="51-200">51-200</MenuItem>
              <MenuItem value="201-500">201-500</MenuItem>
              <MenuItem value="500+">500+</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ mt: 2 }}>
            <Typography gutterBottom>Expected Investment Amount</Typography>
            <Slider
              name="investmentAmount"
              value={formik.values.investmentAmount}
              onChange={(e, val) => formik.setFieldValue('investmentAmount', val)}
              valueLabelDisplay="auto"
              min={10000}
              max={1000000}
            />
          </Box>
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
          >
            Upload Documents
            <input
              type="file"
              hidden
              multiple
              onChange={handleDocChange}
            />
          </Button>
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

export default StartupProfileSetup;

   