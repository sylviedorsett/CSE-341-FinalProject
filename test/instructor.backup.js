const mongoose = require('mongoose');
const request = require('supertest');
const instructorSchema = require('../models/instructors');
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

describe('Instructor API Endpoints', () => {
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
    // await instructorSchema.deleteMany({});
    await mongoose.connection.close();
  });

  let instructorId;
  let instructorIdToDelete = '64270bc5b36755eb69aef151';
  describe('GET /instructors', () => {
    it('should get all instructors', async () => {
      const res = await request.get('/instructors');

      expect(res.status).toBe(200);
      // expect(res.body.length).(1);

      instructorId = '642456d3432a97c8395556cb';
    });
  });

  describe('GET /instructors/:id', () => {
    it('should get an instructor by id', async () => {
      const res = await request.get(`/instructors/641905c0291ee9af6c791954`);

      expect(res.status).toBe(200);
      expect(res.body[0].firstName).toBe('Madison');
      expect(res.body[0].lastName).toBe('Levi');
      expect(res.body[0].department).toBe('English');
      expect(res.body[0].email).toBe('mlevi@test.com');
      expect(res.body[0].tenure).toEqual(false);
      expect(res.body[0].course[0]).toBe('ENG-200');
    });

    // HERE MAYBE IS NECESSARY TO ADD THE FUNCTIONALITY OF 404 ERROR MESSAGE
    // it('should return 404 if id is not found', async () => {
    //   const res = await request.get(`/instructors/641905c0291ee9af6c791923`);
    //   console.log(res.status)
    //   expect(res.status).toBe(400);
    //   expect(res.body).toEqual('No ID by that number exists.');
    // });

    it('should return 400 if id is invalid', async () => {
      const res = await request.get('/instructors/invalid-id');

      expect(res.status).toBe(400);
      expect(res.body).toEqual('Invalid ID entered. Please try again.');
    });
  });

  describe('POST /instructors', () => {
    it('should create a new instructor', async () => {
      const newInstructor = {
        firstName: 'Lily',
        lastName: 'Potter',
        department: 'Pys-Ed',
        email: 'lpotter12@test.com',
        tenure: false,
        course: ['PYS-212']
      };

      const res = await request.post('/instructors').send(newInstructor);
      // console.log(res.status);
      // console.log(res.body);
      // console.log(res);
      expect(res.status).toBe(201);
      expect(res.body.firstName).toEqual('Lily');
      expect(res.body.lastName).toEqual('Potter');
      expect(res.body.department).toEqual('Pys-Ed');
      expect(res.body.email).toEqual('lpotter12@test.com');
      expect(res.body.tenure).toEqual(false);
      expect(res.body.course).toEqual(['PYS-212']);
    });
  });

  describe('PUT /instructors/:id', () => {
    it('should update an instructor by id', async () => {
      const updatedInstructor = {
        firstName: 'John',
        lastName: 'Smith',
        department: 'Mathematics',
        email: 'johnsmith1@example.com',
        tenure: false,
        course: ['MATH101']
      };
      const res = await request
        .put(`/instructors/64245728f1aecec9cd454371`)
        .send(updatedInstructor);

      expect(res.status).toBe(204);
    });

    it('should return 500 if id is not found', async () => {
      const res = await request
        .put(`/instructors/123456789012345678901234`)
        .send({
          firstName: 'John',
          lastName: 'Smith',
          department: 'Mathematics',
          email: 'johnsmith@example.com',
          tenure: false,
          course: ['MATH101']
        });

      expect(res.status).toBe(500);
      expect(res.body).toEqual('An error occurred. Please try again.');
    });

    it('should return 400 if id is invalid', async () => {
      const res = await request
        .put('/instructors/ invalid-id')
        .send({
          firstName: 'John',
          lastName: 'Smith',
          department: 'Mathematics',
          email: 'johnsmith@example.com',
          tenure: false,
          course: ['MATH101']
        });

      expect(res.status).toBe(400);
      expect(res.body).toEqual('Invalid ID entered. Please try again.');
    });
  });

  describe('DELETE /instructors/:id', () => {
    it('should delete an instructor by id', async () => {
      const res = await request.delete(`/instructors/${instructorIdToDelete}`);

      // console.log(res.body);
      expect(res.status).toBe(200);
      expect(res.body.acknowledged).toBe(true);
      expect(res.body.deletedCount).toEqual(1);

      const instructor = await instructorSchema.findById(instructorId);
      expect(instructor).toBeNull();
    });

    it('should return 404 if id is not found', async () => {
      const res = await request.delete(`/instructors/642708f57353aaa6887e855c`);

      expect(res.status).toBe(500);
      expect(res.body).toEqual('Unable to delete contact. Please try again.');
    });

    it('should return 400 if id is invalid', async () => {
      const res = await request.delete('/instructors/invalid-id');

      expect(res.status).toBe(400);
      expect(res.body).toEqual('Invalid ID entered. Please try again.');
    });
  });
});
