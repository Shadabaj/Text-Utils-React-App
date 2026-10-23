import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Member() {

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").max(50),

    email: Yup.string()
      .email("Enter valid email")
      .required("Email is required"),

    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Must include upper, lower, number, special char"
      )
      .required("Password is required"),

    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Confirm password is required"),

    phoneNumber: Yup.string()
      .matches(/^(\+91)?[0-9]{10}$/, "Enter valid number")
      .required("Phone number is required"),

    emailConfirmed: Yup.boolean().required(),

  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
      phoneNumber: "",
      emailConfirmed: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    }
  });

  return (
    <div className="container-fluid mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">

          <div className="card shadow-lg p-4">
            <h3 className="text-center mb-4">➕ Create User</h3>

            <form onSubmit={formik.handleSubmit}>

              <div className="row">

                {/* Name */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Name</label>

                  <input
                    type="text"
                    className={`form-control ${formik.touched.name && formik.errors.name ? "is-invalid" : ""}`}
                    name="name"
                    placeholder="Enter Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.touched.name && formik.errors.name && (
                    <div className="text-danger">{formik.errors.name}</div>
                  )}
                </div>

                {/* Email */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email</label>

                  <input
                    type="email"
                    className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
                    name="email"
                    placeholder="Enter Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.touched.email && formik.errors.email && (
                    <div className="text-danger">{formik.errors.email}</div>
                  )}
                </div>

              </div>

              <div className="row">

                {/* Password */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Password</label>

                  <input
                    type="password"
                    className={`form-control ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
                    name="password"
                    placeholder="Enter Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.touched.password && formik.errors.password && (
                    <div className="text-danger">{formik.errors.password}</div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Confirm Password</label>

                  <input
                    type="password"
                    className={`form-control ${formik.touched.confirmpassword && formik.errors.confirmpassword ? "is-invalid" : ""}`}
                    name="confirmpassword"
                    placeholder="Confirm Password"
                    value={formik.values.confirmpassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.touched.confirmpassword && formik.errors.confirmpassword && (
                    <div className="text-danger">{formik.errors.confirmpassword}</div>
                  )}
                </div>

              </div>

              <div className="row">

                {/* Phone */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Phone Number</label>

                  <input
                    type="tel"
                    className={`form-control ${formik.touched.phoneNumber && formik.errors.phoneNumber ? "is-invalid" : ""}`}
                    name="phoneNumber"
                    placeholder="+919876543210"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <div className="text-danger">{formik.errors.phoneNumber}</div>
                  )}
                </div>

                {/* Email Confirmed */}
                <div className="col-md-6 mb-3">
                  <label className="form-label d-block">Email Confirmed</label>

                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      name="emailConfirmed"
                      value="true"
                      className="form-check-input"
                      onChange={formik.handleChange}
                    />
                    <label className="form-check-label">Yes</label>
                  </div>

                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      name="emailConfirmed"
                      value="false"
                      className="form-check-input"
                      onChange={formik.handleChange}
                    />
                    <label className="form-check-label">No</label>
                  </div>
                </div>

              </div>

              {/* Submit */}
              <div className="text-center mt-3">
                <button
                  type="submit"
                  className="btn btn-primary px-4"
                  disabled={!formik.isValid}
                >
                  🚀 Submit
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}