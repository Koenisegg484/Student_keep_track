package com.Koenisegg484.StudentSystem.service;

import com.Koenisegg484.StudentSystem.model.Student;

import java.util.List;

public interface StudentService {
    public void saveStudent(Student student);
    public List<Student> getAllStudents();
}
