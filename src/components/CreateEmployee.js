import React, { useEffect, useState } from 'react';
import { useFormik } from "formik";
import api from "../api/axiosInstance";

export default function CreateEmployee() {

    const [countryOption, setCountryOption] = useState([]);
    const [stateOption, setStateOption] = useState([]);
    const [cityOption, setCityOption] = useState([]);
    const [gender, setGender] = useState([]);

    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = async () => {
        const res = await api.get("/Location/GetAsyncCountry");
        //const data = await res.json();
        setCountryOption(res.data);
    };

    const fetchStates = async (countryId) => {
        const res = await api.get(`/Location/GetAsyncState?CountryId=${countryId}`);
        //const data = await res.json();
        setStateOption(res.data);
    };

    const fetchCities = async (stateId) => {
        const res = await api.get(`/Location/GetAsyncCity?StateId=${stateId}`);
        //const data = await res.json();
        setCityOption(res.data);
    };

    const fetchgender = async () => {
        const res = await api.get("/Employee/GetAsyncGender");
        setGender(res.data);
    }

    const formik = useFormik({
        initialValues: {
            employeeCode: "",
            firstName: "",
            lastName: "",
            countryId: "",
            stateId: "",
            cityId: "",
            profileImage: null,
            emailAddress: "",
            mobileNumber: "",
            dateOfBirth: "",
            dateOfJoinee: "",
            PanNumber: "",
            PassportNumber: ""
        },

        onSubmit: async (values) => {
            const formData = new FormData();

            console.log(values);

            //console.log(values.file.name);
            formData.append("ProfileImageFile", values.profileImage);
            console.log(formData);
            // append other fields
            Object.keys(values).forEach(key => {
                if (key !== "profileImage") {
                    formData.append(key, values[key]);
                }
            });

            try {
                const res = await api.post(
                    "/Employee/CreateAsyncEmployeeMaster",
                    formData
                );

                console.log(res);
                if (res.status === 200) {
                    alert("Employee Created Successfully");
                    formik.resetForm();
                }

            } catch (error) {
                console.log(error);
            }
        }
    });

    const handleCountryChange = (e) => {
        const countryId = e.target.value;

        formik.setFieldValue("countryId", countryId);
        formik.setFieldValue("stateId", "");
        formik.setFieldValue("cityId", "");

        setStateOption([]);
        setCityOption([]);

        fetchStates(countryId);
    };

    const handleStateChange = (e) => {
        const stateId = e.target.value;

        formik.setFieldValue("stateId", stateId);
        formik.setFieldValue("cityId", "");

        setCityOption([]);

        fetchCities(stateId);
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4">
                <h3 className="text-center mb-4">✨ Create Employee</h3>

                <form onSubmit={formik.handleSubmit}>

                    {/* BASIC INFO */}
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <input
                                className="form-control"
                                name="employeeCode"
                                placeholder="Employee Code"
                                value={formik.values.employeeCode}
                                onChange={formik.handleChange}
                            />
                        </div>

                        <div className="col-md-4 mb-3">
                            <input
                                className="form-control"
                                name="firstName"
                                placeholder="First Name"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                            />
                        </div>

                        <div className="col-md-4 mb-3">
                            <input
                                className="form-control"
                                name="lastName"
                                placeholder="Last Name"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                            />
                        </div>
                    </div>

                    {/* LOCATION */}
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <select
                                className="form-select"
                                name="countryId"
                                value={formik.values.countryId}
                                onChange={handleCountryChange}
                            >
                                <option value="">Select Country</option>
                                {countryOption.map(c => (
                                    <option key={c.rowId} value={c.rowId}>
                                        {c.countryName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-4 mb-3">
                            <select
                                className="form-select"
                                name="stateId"
                                value={formik.values.stateId}
                                onChange={handleStateChange}
                            >
                                <option value="">Select State</option>
                                {stateOption.map(s => (
                                    <option key={s.rowId} value={s.rowId}>
                                        {s.stateName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-4 mb-3">
                            <select
                                className="form-select"
                                name="cityId"
                                value={formik.values.cityId}
                                onChange={formik.handleChange}
                            >
                                <option value="">Select City</option>
                                {cityOption.map(c => (
                                    <option key={c.rowId} value={c.rowId}>
                                        {c.cityName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* CONTACT */}
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <input
                                className="form-control"
                                name="emailAddress"
                                type="email"
                                placeholder="Email Address"
                                value={formik.values.emailAddress}
                                onChange={formik.handleChange}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <input
                                className="form-control"
                                name="mobileNumber"
                                type="number"
                                placeholder="Mobile Number"
                                value={formik.values.mobileNumber}
                                onChange={formik.handleChange}
                            />
                        </div>
                    </div>

                    {/* GovermentID's */}

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label>PanNumber</label>
                            <input
                                className="form-control"
                                type="text"
                                name="PanNumber"
                                placeholder='Enter the PanNumber'
                                value={formik.values.PanNumber}
                                onChange={formik.handleChange}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Passport Number</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder='Enter the PassportNumber'
                                name="PassportNumber"
                                value={formik.values.PassportNumber}
                                onChange={formik.handleChange}
                            />
                        </div>
                    </div>

                    {/* DATES */}
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label>DOB</label>
                            <input
                                className="form-control"
                                type="date"
                                name="dateOfBirth"
                                value={formik.values.dateOfBirth}
                                onChange={formik.handleChange}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Joining Date</label>
                            <input
                                className="form-control"
                                type="date"
                                name="dateOfJoinee"
                                value={formik.values.dateOfJoinee}
                                onChange={formik.handleChange}
                            />
                        </div>

                    </div>

                    <div className='row'>
                        <div className="col-md-12 mb-3">
                            <label className="form-label">Gender</label>

                            <div className="form-check">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="1"
                                    className="form-check-input"
                                    checked={formik.values.gender === "1"}
                                    onChange={formik.handleChange}
                                />
                                <label className="form-check-label">Male</label>
                            </div>

                            <div className="form-check">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="2"
                                    className="form-check-input"
                                    checked={formik.values.gender === "2"}
                                    onChange={formik.handleChange}
                                />
                                <label className="form-check-label">Female</label>
                            </div>

                            <div className="form-check">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="3"
                                    className="form-check-input"
                                    checked={formik.values.gender === "3"}
                                    onChange={formik.handleChange}
                                />
                                <label className="form-check-label">X</label>
                            </div>

                        </div>

                    </div>

                    {/* FILE UPLOAD */}
                    <div className="mb-3">
                        <input
                            className="form-control"
                            type="file"
                            name="profileImage"
                            onChange={(e) => {
                                formik.setFieldValue("profileImage", e.target.files[0]);
                            }}
                        />
                    </div>

                    {/* IMAGE PREVIEW */}
                    {formik.values.profileImage && (
                        <div className="text-center mb-3">
                            <img
                                src={URL.createObjectURL(formik.values.profileImage)}
                                alt="preview"
                                className="rounded-circle"
                                width="100"
                            />
                        </div>
                    )}

                    {/* SUBMIT */}
                    <div className="text-center">
                        <button className="btn btn-primary px-5">
                            🚀 Save Employee
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}