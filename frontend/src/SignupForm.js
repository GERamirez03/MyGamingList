import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

function SignupForm() {

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            email: ""
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .max(15, "Must be 15 characters or less")
                .required("Required"),
            password: Yup.string() // investigate regex for password validation
                .max(20, "Must be 20 characters or less")
                .min(8, "Must be 8 characters or more")
                .required("Required"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Required")
        }),
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username 
            ? <div>{formik.errors.username}</div> 
            : null}

            <label htmlFor="password">Password</label>
            <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password 
            ? <div>{formik.errors.password}</div> 
            : null}
            
            <label htmlFor="email">Email</label>
            <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email 
            ? <div>{formik.errors.email}</div> 
            : null}

            <button type="submit">Submit</button>
        </form>
    );
};

export default SignupForm;