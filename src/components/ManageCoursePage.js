import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import * as CourseApi from "../api/courseApi";
import { toast } from "react-toastify";

const ManageCoursePage = (props) => {
  const [errors, setErrors] = useState({});
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authoeId: null,
    category: "",
  });

  useEffect(() => {
    const slug = props.match.params.slug;
    if (slug) {
      CourseApi.getCourseBySlug(slug).then((_course) => setCourse(_course));
    }
  }, [props.match.params.slug]);

  function handleChange({ target }) {
    setCourse({
      ...course,
      [target.name]: target.value,
    });
  }
  function formIsValid() {
    const _errors = {};
    if (!course.title) _errors.title = "Title is Required.";
    if (!course.authorId) _errors.authorId = "Author Id is Required.";
    if (!course.category) _errors.category = "Category is REquired.";

    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    CourseApi.saveCourse(course).then(() => {
      toast.success("Course Saved.");
      props.history.push("/courses");
    });
  }
  return (
    <>
      <h2> Manage Course</h2>
      <CourseForm
        errors={errors}
        course={course}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};
export default ManageCoursePage;
