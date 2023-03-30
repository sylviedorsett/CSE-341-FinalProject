// const app = require('../server');
// const supertest = require('supertest');
const mongoose = require('mongoose');
const request = require('supertest');
const instructorSchema = require('../models/instructors');
const app = require('../server');
const { MongoMemoryServer } = require('mongodb-memory-server');
require('dotenv').config();

async function connect() {
  // mongoServer = new MongoMemoryServer();
  // const mongoUri = process.env.CONNECTIONSTRING || await mongoServer.getUri();
  // await mongoose.connect(mongoUri);
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
    // try {
    //   await mongoose.connect(process.env.CONNECTIONSTRING, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     useCreateIndex: true,
    //     useFindAndModify: false,
    //   });
    //   console.log('MongoDB connected!');
    // } catch (err) {
    //   console.error(err.message);
    //   process.exit(1);
    // }

    // // Add test data
    // const newInstructor = new instructorSchema({
    //   firstName: 'John',
    //   lastName: 'Doe',
    //   department: 'Computer Science',
    //   email: 'jo@gmail.com',
    //   tenure: true,
    //   course: 'CS101'
    // });
    // await newInstructor.save();
  });

  afterAll(async () => {
    // Clean up test database
    // await instructorSchema.deleteMany({});
    await mongoose.connection.close();
  });

  let instructorId;
  let instructorIdToDelete = '641905c0291ee9af6c791952';
  describe('GET /instructors', () => {
    it('should get all instructors', async () => {
      const res = await request(app).get('/instructors');

      expect(res.status).toBe(200);
      // expect(res.body.length).(1);

      instructorId = '642456d3432a97c8395556cb';
    });
  });

  describe('GET /instructors/:id', () => {
    it('should get an instructor by id', async () => {
      const res = await request(app).get(`/instructors/641905c0291ee9af6c791954`);

      expect(res.status).toBe(200);
      expect(res.body[0].firstName).toBe('Madison');
      expect(res.body[0].lastName).toBe('Levi');
      expect(res.body[0].department).toBe('English');
      expect(res.body[0].email).toBe('mlevi@test.com');
      expect(res.body[0].tenure).toEqual(true);
      expect(res.body[0].course[0]).toBe('ENG-200');
    });

    // HERE MAYBE IS NECESSARY TO ADD THE FUNCTIONALITY OF 404 ERROR MESSAGE
    // it('should return 404 if id is not found', async () => {
    //   const res = await request(app).get(`/instructors/641905c0291ee9af6c791923`);
    //   console.log(res.status)
    //   expect(res.status).toBe(400);
    //   expect(res.body).toEqual('No ID by that number exists.');
    // });

    it('should return 400 if id is invalid', async () => {
      const res = await request(app).get('/instructors/invalid-id');

      expect(res.status).toBe(400);
      expect(res.body).toEqual('Invalid ID entered. Please try again.');
    });
  });

  // describe('POST /instructors', () => {
  //   it('should create a new instructor', async () => {
  //     const newInstructor = {
  //       firstName: 'Jane',
  //       lastName: 'Doe',
  //       department: 'Msathematics',
  //       email: 'janedodsadess@example.com',
  //       tenure: false,
  //       course: 'MATH101'
  //    };

  //     const res = await request(app).post('/instructors').send(newInstructor);
  //     console.log(res.status)
  //     console.log(res.body)
  //     console.log(res)
  //     expect(res.status).toBe(201);
  //     expect(res.body[0].firstName).toEqual('Jane');
  //     expect(res.body[0].lastName).toEqual('Doe');
  //     expect(res.body[0].department).toEqual('Mathematics');
  //     expect(res.body[0].email).toEqual('janedodsadess@example.com');
  //     expect(res.body[0].tenure).toEqual(false);
  //     expect(res.body[0].course).toEqual('MATH101');
  //   });
  // });
  /* 
    describe('POST /instructors', () => {
    it('should create a new instructor', async () => {
      const postInstructor = {
        firstName: 'Jane',
        lastName: 'Doe',
        department: 'Mathematics',
        email: 'morganfreeman@example.com',
        tenure: false,
        course: 'MATH101'
      };
      
      const res = await request(app)
        .post('/instructors')
        .send(postInstructor);
  
      expect(res.status).toBe(201);
      expect(res.body[0].firstName).toEqual('Jane');
      expect(res.body[0].lastName).toEqual('Doe');
      expect(res.body[0].department).toEqual('Mathematics');
      expect(res.body[0].email).toEqual('janedodsadess@example.com');
      expect(res.body[0].tenure).toEqual(false);
      expect(res.body[0].course).toEqual('MATH101');
    });
  }); */

  describe('PUT /instructors/:id', () => {
    it('should update an instructor by id', async () => {
      const updatedInstructor = {
        firstName: 'John',
        lastName: 'Smith',
        department: 'Mathematics',
        email: 'johnsmith@example.com',
        tenure: false,
        course: 'MATH101'
      };
      const res = await request(app)
        .put(`/instructors/64245728f1aecec9cd454371`)
        .send(updatedInstructor);

      expect(res.status).toBe(200);
      expect(res.body.firstName).toEqual('John');
      expect(res.body.lastName).toEqual('Smith');
      expect(res.body.department).toEqual('Mathematics');
      expect(res.body.email).toEqual('johnsmith@example.com');
      expect(res.body.tenure).toEqual(false);
      expect(res.body.course).toEqual('MATH101');
    });

    it('should return 404 if id is not found', async () => {
      const res = await request(app).put(`/instructors/123456789012345678901234`).send({
        firstName: 'John',
        lastName: 'Smith',
        department: 'Mathematics',
        email: 'johnsmith@example.com',
        tenure: false,
        course: 'MATH101'
      });

      expect(res.status).toBe(404);
      expect(res.body).toEqual('Instructor not found. Please try again.');
    });

    it('should return 400 if id is invalid', async () => {
      const res = await request(app).put('/instructors/ invalid-id').send({
        firstName: 'John',
        lastName: 'Smith',
        department: 'Mathematics',
        email: 'johnsmith@example.com',
        tenure: false,
        course: 'MATH101'
      });

      expect(res.status).toBe(400);
      expect(res.body).toEqual(
        '[Invalid ID](poe://www.poe.com/_api/key_phrase?phrase=Invalid%20ID&prompt=Tell%20me%20more%20about%20Invalid%20ID.) entered. Please try again.'
      );
    });
  });

  describe('DELETE /instructors/:id', () => {
    it('should delete an instructor by id', async () => {
      const res = await request(app).delete(`/instructors/${instructorIdToDelete}`);

      console.log(res.body);
      expect(res.status).toBe(200);
      expect(res.body.acknowledged).toBe(true);
      expect(res.body.deletedCount).toEqual(1);

      const instructor = await instructorSchema.findById(instructorId);
      expect(instructor).toBeNull();
    });

    it('should return 404 if id is not found', async () => {
      const res = await request(app).delete(`/instructors/64244d4b6727ea7d0a2d982f`);

      expect(res.status).toBe(500);
      expect(res.body).toEqual('Unable to delete contact. Please try again.');
    });

    it('should return 400 if id is invalid', async () => {
      const res = await request(app).delete('/instructors/invalid-id');

      expect(res.status).toBe(400);
      expect(res.body).toEqual('Invalid ID entered. Please try again.');
    });
  });
});
