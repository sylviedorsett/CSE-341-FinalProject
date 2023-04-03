// Require dependencies
const request = require('./test.config')();
const courseSchema = require('../models/courses');

describe('course API Endpoints', () => {
  let newCourseId; // define global variable to store new course id

  /* CREATE/POST TESTS --------------------------------------*/
  describe('POST /courses', () => {
    it('Should create a new course and return it', async () => {
      const newCourse = {
        courseTitle: 'Art History',
        courseId: 'Art-101',
        instructor: 'Claire Movelo',
        classMax: 50,
        currentEnrollment: 24,
        startDate: '04/17/2023',
        endDate: '7/24/2023'
      };

      const res = await request.post('/courses').send(newCourse);

      // Verify that the response status code is 201 (created)
      expect(res.status).toBe(201);

      // Verify that the response body is an object with the correct keys
      expect(res.body).toEqual(
        expect.objectContaining({
          _id: expect.any(String),
          courseTitle: newCourse.courseTitle,
          courseId: newCourse.courseId,
          instructor: newCourse.instructor,
          classMax: newCourse.classMax,
          currentEnrollment: newCourse.currentEnrollment,
          startDate: newCourse.startDate,
          endDate: newCourse.endDate
        })
      );
      /* Set the new id globally */

      newCourseId = res.body._id;
      // Verify that the new course was actually added to the database
      const addedcourse = await courseSchema.findById(res.body._id);
      expect(addedcourse).toMatchObject(newCourse);
    });
  });

  /* UPDATE/PUT TESTS --------------------------------------*/
  describe('PUT /courses/:id', () => {
    it('Should update an existing course', async () => {
      const updatedCourse = {
        courseTitle: 'Art History - EDITED',
        courseId: 'Art-101 - EDITED',
        instructor: 'Claire Movelo',
        classMax: 50,
        currentEnrollment: 43,
        startDate: '04/17/2023',
        endDate: '7/24/2023'
      };

      const res = await request.put(`/courses/${newCourseId}`).send(updatedCourse);

      // Verify that the response status code is 204 (OK)
      expect(res.status).toBe(204);

      // Verify that the response body is null
      expect(res.body).toEqual({});

      // Verify that the course was actually updated in the database
      const updatedCourseFromDB = await courseSchema.findById(newCourseId);
      expect(updatedCourseFromDB).toMatchObject(updatedCourse);
    });
  });

  describe('GET ALL /courses', () => {
    it('Should get all courses', async () => {
      const res = await request.get('/courses');
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array); // assert that the response is an array
      expect(res.body.length).toBeGreaterThan(0); // assert that the array has at least one element
    });
  });

  /* GET ONE TESTS */
  describe('GET ONE /courses/:id', () => {
    it('Should get ONE course', async () => {
      const res = await request.get(`/courses/${newCourseId}`);

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array); // assert that the response is an array
      expect(res.body.length).toBeGreaterThan(0); // assert that the array has at least one element
      const course = res.body[0];
      expect(course).toHaveProperty('_id');
      expect(course).toHaveProperty('courseTitle');
      expect(course).toHaveProperty('courseId');
      expect(course).toHaveProperty('instructor');
      expect(course).toHaveProperty('classMax');
      expect(course).toHaveProperty('currentEnrollment');
      expect(course).toHaveProperty('startDate');
      expect(course).toHaveProperty('endDate');
      // you can also check specific values of properties, for example:
      expect(course.courseTitle).toEqual('Art History - EDITED');
      expect(course.courseId).toEqual('Art-101 - EDITED');
      expect(course.instructor).toEqual('Claire Movelo');
      expect(course.classMax).toEqual(50);
      expect(course.currentEnrollment).toEqual(43);
      expect(course.startDate).toEqual('04/17/2023');
      expect(course.endDate).toEqual('7/24/2023');
    });
  });

  /* DELETE TESTS --------------------------------------*/
  describe('DELETE /courses/:id', () => {
    it('Should delete the newly created course', async () => {
      const res = await request.delete(`/courses/${newCourseId}`);

      // Verify that the response status code is 200 (OK)
      expect(res.status).toBe(200);

      // Verify that the response body is an object with the correct message
      expect(res.body).toEqual({
        acknowledged: true,
        deletedCount: 1
      });

      // Verify that the course was actually deleted from the database
      const deletedcourse = await courseSchema.findById(newCourseId);
      expect(deletedcourse).toBeNull();
    });
  });
});
