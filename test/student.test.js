// Require dependencies
const request = require('./test.config')();
const studentSchema = require('../models/students');

describe('student API Endpoints', () => {
  let newStudentId; // define global variable to store new student id

  /* CREATE/POST TESTS --------------------------------------*/
  describe('POST /students', () => {
    it('Should create a new student and return it', async () => {
      const newStudent = {
        firstName: 'Harry',
        lastName: 'Howsen',
        major: 'Athletics',
        email: 'hhsushi@test.com',
        birthdate: '7/24/1988'
      };

      const res = await request.post('/students').send(newStudent);

      // Verify that the response status code is 201 (created)
      expect(res.status).toBe(201);

      // Verify that the response body is an object with the correct keys
      expect(res.body).toEqual(
        expect.objectContaining({
          _id: expect.any(String),
          firstName: newStudent.firstName,
          lastName: newStudent.lastName,
          major: newStudent.major,
          email: newStudent.email,
          birthdate: newStudent.birthdate
        })
      );
      /* Set the new id globally */

      newStudentId = res.body._id;
      // Verify that the new student was actually added to the database
      const addedStudent = await studentSchema.findById(res.body._id);
      expect(addedStudent).toMatchObject(newStudent);
    });
  });

  /* UPDATE/PUT TESTS --------------------------------------*/
  describe('PUT /students/:id', () => {
    it('Should update an existing student', async () => {
      const updatedStudent = {
        firstName: 'Harry',
        lastName: 'Howsen',
        major: 'Gymnastics',
        email: 'hhsushi@test.com',
        birthdate: '7/24/1988'
      };

      const res = await request.put(`/students/${newStudentId}`).send(updatedStudent);

      // Verify that the response status code is 204 (OK)
      expect(res.status).toBe(204);

      // Verify that the response body is null
      expect(res.body).toEqual({});

      // Verify that the student was actually updated in the database
      const updatedStudentFromDB = await studentSchema.findById(newStudentId);
      expect(updatedStudentFromDB).toMatchObject(updatedStudent);
    });
  });

  /* GET ALL TESTS ----------------------------------------*/
  describe('GET ALL /students', () => {
    it('Should get all students', async () => {
      const res = await request.get('/students');
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array); // assert that the response is an array
      expect(res.body.length).toBeGreaterThan(0); // assert that the array has at least one element
    });
  });

  /* GET ONE TESTS ----------------------------------------*/
  describe('GET ONE /students/:id', () => {
    it('Should get ONE student', async () => {
      const res = await request.get(`/students/${newStudentId}`);

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array); // assert that the response is an array
      expect(res.body.length).toBeGreaterThan(0); // assert that the array has at least one element
      const student = res.body[0];
      expect(student).toHaveProperty('_id');
      expect(student).toHaveProperty('firstName');
      expect(student).toHaveProperty('lastName');
      expect(student).toHaveProperty('major');
      expect(student).toHaveProperty('email');
      expect(student).toHaveProperty('birthdate');

      // you can also check specific values of properties, for example:
      expect(student.firstName).toEqual('Harry');
      expect(student.lastName).toEqual('Howsen');
      expect(student.major).toEqual('Gymnastics');
      expect(student.email).toEqual('hhsushi@test.com');
      expect(student.birthdate).toEqual('7/24/1988');
    });
  });

  /* DELETE TESTS --------------------------------------*/
  describe('DELETE /students/:id', () => {
    it('Should delete the newly created student', async () => {
      const res = await request.delete(`/students/${newStudentId}`);

      // Verify that the response status code is 200 (OK)
      expect(res.status).toBe(200);

      // Verify that the response body is an object with the correct message
      expect(res.body).toEqual({
        acknowledged: true,
        deletedCount: 1
      });

      // Verify that the student was actually deleted from the database
      const deletedStudent = await studentSchema.findById(newStudentId);
      expect(deletedStudent).toBeNull();
    });
  });
});
