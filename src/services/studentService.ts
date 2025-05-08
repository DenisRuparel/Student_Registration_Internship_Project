import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  grade: string;
}

export const getStudents = async (): Promise<Student[]> => {
  const querySnapshot = await getDocs(collection(db, 'students'));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Student[];
};

export const addStudent = async (student: Omit<Student, 'id'>): Promise<void> => {
  await addDoc(collection(db, 'students'), student);
};

export const filterStudentsByCourse = (students: Student[], course: string): Student[] => {
  if (!course) return students;
  return students.filter(student =>
    student.course.toLowerCase().includes(course.toLowerCase())
  );
}; 