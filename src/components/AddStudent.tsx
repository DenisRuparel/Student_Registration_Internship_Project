import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Alert,
  MenuItem
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import type { Student } from '../services/studentService';
import { addStudent } from '../services/studentService';
import { useNavigate } from 'react-router-dom';

const courses = [
  'Computer Science',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology'
];

const grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'];

const AddStudent: React.FC = () => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    grade: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.course || !formData.grade) {
      setError('All fields are required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setError('Please login to add a student');
      return;
    }

    if (!validateForm()) return;

    try {
      setLoading(true);
      setError('');
      await addStudent(formData as Omit<Student, 'id'>);
      setSuccess('Student added successfully');
      setFormData({
        name: '',
        email: '',
        course: '',
        grade: ''
      });
      navigate('/');
    } catch (err) {
      setError('Failed to add student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Add New Student
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              select
              label="Course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              margin="normal"
              required
            >
              {courses.map((course) => (
                <MenuItem key={course} value={course}>
                  {course}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              select
              label="Grade"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              margin="normal"
              required
            >
              {grades.map((grade) => (
                <MenuItem key={grade} value={grade}>
                  {grade}
                </MenuItem>
              ))}
            </TextField>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              disabled={loading || !currentUser}
            >
              {loading ? 'Adding...' : 'Add Student'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default AddStudent; 