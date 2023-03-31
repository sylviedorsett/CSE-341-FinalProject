const mongoose = require('mongoose');
const request = require('supertest');
const studentSchema = require('../models/students');
const app = require('../server');
require('dotenv').config();

async function connect() {
  try {
    await mongoose.connect(process.env.CONNECTIONSTRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('MongoDB connected!');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

describe('Student API Endpoints', () => {
  beforeAll(async () => {
    // Set up test database
    await mongoose.connect(process.env.CONNECTIONSTRING, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    });
  });

  afterAll(async () => {
    // Clean up test database
    // await studentSchema.deleteMany({});
    await mongoose.connection.close();
  });

  let studentId;
  let studentIdToDelete = '641905d6291ee9af6c79196f';
  
  // Test getAllStudents
  describe('GET /students', () => {
    it('should get all students', async () => {
      const res = await request(app).get('/students');

      expect(res.status).toBe(200);
      // expect(res.body.length).(1);

    });
  });

  // Test getStudent
  describe('GET /students/:id', () => {
    it('should get a student by id', async () => {
      const res = await request(app).get(`/students/641905d6291ee9af6c791962`);

      expect(res.status).toBe(200);
      expect(res.body[0].firstName).toBe('Jenny');
      expect(res.body[0].lastName).toBe('Peters');
      expect(res.body[0].major).toBe('Science');
      expect(res.body[0].email).toBe('jpeters@test.com');
      expect(res.body[0].birthdate).toBe('06/01/1999');
    });

    it('should return 400 if id is invalid', async () => {
      const res = await request(app).get('/students/invalid-id');

      expect(res.status).toBe(400);
      expect(res.body).toEqual('Invalid ID entered. Please try again.');
    });
  });

  // Test postStudent
  describe('POST /students', () => {
    it('should create a new student', async () => {
      const newstudent = {
        firstName: 'Lila',
        lastName: 'Cotter',
        major: 'Pys-Ed',
        email: 'lcotter@test.com',
        birthdate: '12/12/2000'
      };

      const res = await request(app).post('/students').send(newstudent);
      expect(res.status).toBe(201);
      expect(res.body.firstName).toEqual('Lila');
      expect(res.body.lastName).toEqual('Cotter');
      expect(res.body.major).toEqual('Pys-Ed');
      expect(res.body.email).toEqual('lcotter@test.com');
      expect(res.body.birthdate).toEqual('12/12/2000');
    });
  });

  // Test putStudent
  describe('PUT /students/:id', () => {
    it('should update an student by id', async () => {
      const updatedstudent = {
        firstName: 'Ryan',
        lastName: 'Abner',
        major: 'Mathematics',
        email: 'rabner@test.com',
        birthdate: '10/01/1999'
      };
      const res = await request(app)
        .put(`/students/641905d6291ee9af6c79196d`)
        .send(updatedstudent);

      expect(res.status).toBe(204);
    });

    it('should return 500 if id is not found', async () => {
      const res = await request(app)
        .put(`/students/123456789012345678901234`)
        .send({
            firstName: 'Ryan',
            lastName: 'Abner',
            major: 'Mathematics',
            email: 'rabner@test.com',
            birthdate: '10/01/1999'
        });

      expect(res.status).toBe(500);
      expect(res.body).toEqual('An error occurred. Please try again.');
    });

    it('should return 400 if id is invalid', async () => {
      const res = await request(app)
        .put('/students/invalid-id')
        .send({
            firstName: 'Ryan',
            lastName: 'Abner',
            major: 'Mathematics',
            email: 'rabner@test.com',
            birthdate: '10/01/1999'
        });

      expect(res.status).toBe(400);
      expect(res.body).toEqual('Invalid ID entered. Please try again.');
    });
  });

  describe('DELETE /students/:id', () => {
    it('should delete a student by id', async () => {
      const res = await request(app).delete(`/students/${studentIdToDelete}`);

      // console.log(res.body);
      expect(res.status).toBe(200);
      expect(res.body.acknowledged).toBe(true);
      expect(res.body.deletedCount).toEqual(1);

      const student = await studentSchema.findById(studentId);
      expect(student).toBeNull();
    });

    it('should return 404 if id is not found', async () => {
      const res = await request(app).delete(`/students/642708f57444aaa6887e855c`);

      expect(res.status).toBe(500);
      expect(res.body).toEqual('Unable to delete student. Please try again.');
    });

    it('should return 400 if id is invalid', async () => {
      const res = await request(app).delete('/students/invalid-id');

      expect(res.status).toBe(400);
      expect(res.body).toEqual('Invalid ID entered. Please try again.');
    });
  });
});