import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  CircularProgress,
  Container
} from '@mui/material';
import { getStudents, filterStudentsByCourse } from '../services/studentService';
import type { Student } from '../services/studentService';

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [courseFilter, setCourseFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
        setFilteredStudents(data);
      } catch (err) {
        setError('Failed to fetch students');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    const filtered = filterStudentsByCourse(students, courseFilter);
    setFilteredStudents(filtered);
  }, [courseFilter, students]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 3 } }}>
      <Box sx={{ my: { xs: 2, sm: 4 } }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            display: 'inline-block',
            background: '#43a047',
            color: '#fff',
            px: 2,
            py: 0.5,
            borderRadius: 1,
            boxShadow: 1,
            mb: 3,
            fontSize: { xs: '1.5rem', sm: '2.125rem' }
          }}
        >
          Student List
        </Typography>
        <TextField
          fullWidth
          size="small"
          label="Filter by Course"
          variant="outlined"
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          sx={{ mb: 3 }}
        />
        <Box sx={{ width: '100%', overflowX: 'auto' }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Course</TableCell>
                  <TableCell>Grade</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.course}</TableCell>
                    <TableCell>{student.grade}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Container>
  );
};

export default StudentList; 