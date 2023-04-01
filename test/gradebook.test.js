// Require dependencies
const request = require('./test.config')();
const gradebookSchema = require('../models/gradebooks');

describe('gradebook API Endpoints', () => {
  let newGradebookId; // define global variable to store new gradebook id

  /* CREATE/POST TESTS --------------------------------------*/
  describe('POST /gradebooks', () => {
    it('Should create a new gradebook and return it', async () => {
      const newGradebook = {
        firstName: 'Santi',
        lastName: 'Pintus II',
        teacher: 'George Santos',
        class: 'MATH-111',
        gpa: 2,
        assignments: [
          'L01: 78',
          'L01Quiz: 72',
          'L02: 76',
          'L02Quiz: 74',
          'L03: 0',
          'L03Quiz: 0',
          'Module1Exam: 0',
          'L04Quiz: 100'
        ],
        missingAssignments: 0,
        absences: 0
      };

      const res = await request.post('/gradebooks').send(newGradebook);

      // Verify that the response status code is 201 (created)
      expect(res.status).toBe(201);

      // Verify that the response body is an object with the correct keys
      expect(res.body).toEqual(
        expect.objectContaining({
          _id: expect.any(String),
          firstName: newGradebook.firstName,
          lastName: newGradebook.lastName,
          teacher: newGradebook.teacher,
          class: newGradebook.class,
          gpa: newGradebook.gpa,
          assignments: newGradebook.assignments,
          missingAssignments: newGradebook.missingAssignments,
          absences: newGradebook.absences
        })
      );
      /* Set the new id globally */

      newGradebookId = res.body._id;
      // Verify that the new gradebook was actually added to the database
      const addedGradebook = await gradebookSchema.findById(res.body._id);
      expect(addedGradebook).toMatchObject(newGradebook);
    });
  });

  /* UPDATE/PUT TESTS --------------------------------------*/
  describe('PUT /gradebooks/:id', () => {
    it('Should update an existing gradebook', async () => {
      const updatedGradebook = {
        firstName: 'Santi EDITED',
        lastName: 'Pintus EDITED',
        teacher: 'George Santos',
        class: 'MATH-111',
        gpa: 2,
        assignments: [
          'L01: 78',
          'L01Quiz: 72',
          'L02: 76',
          'L02Quiz: 74',
          'L03: 0',
          'L03Quiz: 0',
          'Module1Exam: 0',
          'L04Quiz: 100'
        ],
        missingAssignments: 0,
        absences: 0
      };

      const res = await request.put(`/gradebooks/${newGradebookId}`).send(updatedGradebook);

      // Verify that the response status code is 204 (OK)
      expect(res.status).toBe(204);

      // Verify that the response body is null
      expect(res.body).toEqual({});

      // Verify that the gradebook was actually updated in the database
      const updatedGradebookFromDB = await gradebookSchema.findById(newGradebookId);
      expect(updatedGradebookFromDB).toMatchObject(updatedGradebook);
    });
  });

  describe('GET ALL /gradebooks', () => {
    it('Should get all gradebooks', async () => {
      const res = await request.get('/gradebooks');
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array); // assert that the response is an array
      expect(res.body.length).toBeGreaterThan(0); // assert that the array has at least one element
    });
  });

  /* GET ONE TESTS */
  describe('GET ONE /gradebooks/:id', () => {
    it('Should get ONE gradebook', async () => {
      const res = await request.get(`/gradebooks/${newGradebookId}`);

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array); // assert that the response is an array
      expect(res.body.length).toBeGreaterThan(0); // assert that the array has at least one element
      const gradebook = res.body[0];
      expect(gradebook).toHaveProperty('_id');
      expect(gradebook).toHaveProperty('firstName');
      expect(gradebook).toHaveProperty('lastName');
      expect(gradebook).toHaveProperty('teacher');
      expect(gradebook).toHaveProperty('class');
      expect(gradebook).toHaveProperty('gpa');
      expect(gradebook).toHaveProperty('assignments');
      expect(gradebook).toHaveProperty('missingAssignments');
      expect(gradebook).toHaveProperty('absences');
      // you can also check specific values of properties, for example:
      expect(gradebook.firstName).toEqual('Santi EDITED');
      expect(gradebook.lastName).toEqual('Pintus EDITED');
      expect(gradebook.teacher).toEqual('George Santos');
      expect(gradebook.class).toEqual('MATH-111');
      expect(gradebook.gpa).toEqual(2);
      expect(gradebook.assignments).toEqual([
        'L01: 78',
        'L01Quiz: 72',
        'L02: 76',
        'L02Quiz: 74',
        'L03: 0',
        'L03Quiz: 0',
        'Module1Exam: 0',
        'L04Quiz: 100'
      ]);
      expect(gradebook.missingAssignments).toEqual(0);
      expect(gradebook.absences).toEqual(0);
    });
  });

  /* DELETE TESTS --------------------------------------*/
  describe('DELETE /gradebooks/:id', () => {
    it('Should delete the newly created gradebook', async () => {
      const res = await request.delete(`/gradebooks/${newGradebookId}`);

      // Verify that the response status code is 200 (OK)
      expect(res.status).toBe(200);

      // Verify that the response body is an object with the correct message
      expect(res.body).toEqual({
        acknowledged: true,
        deletedCount: 1
      });

      // Verify that the gradebook was actually deleted from the database
      const deletedGradebook = await gradebookSchema.findById(newGradebookId);
      expect(deletedGradebook).toBeNull();
    });
  });
});
