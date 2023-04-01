// Require dependencies
const request = require('./test.config')();
const instructorSchema = require('../models/instructors');

describe('instructor API Endpoints', () => {
  let newInstructorId; // define global variable to store new instructor id

  /* CREATE/POST TESTS --------------------------------------*/
  describe('POST /instructors', () => {
    it('Should create a new instructor and return it', async () => {
      const newInstructor = {
        firstName: 'Lily',
        lastName: 'Potter',
        department: 'Pys-Ed',
        email: 'lpotter@test.com',
        tenure: false,
        courses: ['PYS-212']
      };

      const res = await request.post('/instructors').send(newInstructor);

      // Verify that the response status code is 201 (created)
      expect(res.status).toBe(201);

      // Verify that the response body is an object with the correct keys
      expect(res.body).toEqual(
        expect.objectContaining({
          _id: expect.any(String),
          firstName: newInstructor.firstName,
          lastName: newInstructor.lastName,
          department: newInstructor.department,
          email: newInstructor.email,
          tenure: newInstructor.tenure,
          courses: newInstructor.courses
        })
      );
      /* Set the new id globally */
      console.log(res.body);
      newInstructorId = res.body._id;
      // Verify that the new instructor was actually added to the database
      const addedInstructor = await instructorSchema.findById(res.body._id);
      expect(addedInstructor).toMatchObject(newInstructor);
    });
  });

  /* UPDATE/PUT TESTS --------------------------------------*/
  describe('PUT /instructors/:id', () => {
    it('Should update an existing instructor', async () => {
      const updatedInstructor = {
        firstName: 'Lily EDITED',
        lastName: 'Potter EDITED',
        department: 'Pys-Ed',
        email: 'lpotter@test.com',
        tenure: false,
        courses: ['PYS-212']
      };

      const res = await request.put(`/instructors/${newInstructorId}`).send(updatedInstructor);

      // Verify that the response status code is 204 (OK)
      expect(res.status).toBe(204);

      // Verify that the response body is null
      expect(res.body).toEqual({});

      // Verify that the instructor was actually updated in the database
      const updatedInstructorFromDB = await instructorSchema.findById(newInstructorId);
      expect(updatedInstructorFromDB).toMatchObject(updatedInstructor);
    });
  });

  describe('GET ALL /instructors', () => {
    it('Should get all instructors', async () => {
      const res = await request.get('/instructors');
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array); // assert that the response is an array
      expect(res.body.length).toBeGreaterThan(0); // assert that the array has at least one element
    });
  });

  /* GET ONE TESTS */
  describe('GET ONE /instructors/:id', () => {
    it('Should get ONE instructor', async () => {
      const res = await request.get(`/instructors/${newInstructorId}`);

      expect(res.status).toBe(200);
      expect(res.body).not.toBeNull();
      
      const instructor = res.body[0];
      expect(instructor).toHaveProperty('_id');
      expect(instructor).toHaveProperty('firstName');
      expect(instructor).toHaveProperty('lastName');
      expect(instructor).toHaveProperty('department');
      expect(instructor).toHaveProperty('email');
      expect(instructor).toHaveProperty('tenure');
      expect(instructor).toHaveProperty('courses');
      expect(instructor.firstName).toEqual('Lily EDITED');
      expect(instructor.lastName).toEqual('Potter EDITED');
      expect(instructor.department).toEqual('Pys-Ed');
      expect(instructor.email).toEqual('lpotter@test.com');
      expect(instructor.tenure).toEqual(false);
      expect(instructor.courses).toEqual(['PYS-212']);
    });
  });

  /* DELETE TESTS --------------------------------------*/
  describe('DELETE /instructors/:id', () => {
    it('Should delete the newly created instructor', async () => {
      const res = await request.delete(`/instructors/${newInstructorId}`);

      // Verify that the response status code is 200 (OK)
      expect(res.status).toBe(200);

      // Verify that the response body is an object with the correct message
      expect(res.body).toEqual({
        acknowledged: true,
        deletedCount: 1
      });

      // Verify that the instructor was actually deleted from the database
      const deletedInstructor = await instructorSchema.findById(newInstructorId);
      expect(deletedInstructor).toBeNull();
    });
  });
});
