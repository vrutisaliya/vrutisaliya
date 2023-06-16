import React, { useContext } from "react";
import { CrudContext } from "./CrudContext";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button, InputLabel, Typography } from "@mui/material";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
const CrudForm = () => {
  const { addData, updateData } = useContext(CrudContext);
  const navigate = useNavigate();
  const handleSubmit = (values, { resetForm }) => {
  if (values.index === undefined) {
    // Calculate the next ID
    const storedData = JSON.parse(localStorage.getItem("data")) || [];
    const nextId = storedData.length > 0 ? storedData[storedData.length - 1].id + 1 : 1;

    // Add the ID to the submitted values
    const newData = { ...values, id: nextId };

    // Update the data array
    addData(newData);

    // Reset the form
    resetForm();

    // Navigate to the list page
    navigate("/list");

    // Update the data in local storage
    storedData.push(newData);
    localStorage.setItem("data", JSON.stringify(storedData));
  } else {
    updateData(values.index, values);
  }
};


  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    phone: Yup.string()
      .required("Mobile number is required")
      .max(10, "maximum 10 digits")
      .matches(/[0-9]{10}/, {
        message: "required 10 digits!",
        excludeEmptyString: false,
      }),
    email: Yup.string().email("Invalid email").required("Email is required"),
    address: Yup.string().required("address is required"),

    gender: Yup.string().required("Gender is required"),
    qulification: Yup.string().required("qulification method is required"),

    // Add validation rules for other fields
  });

  const initialValues = {
    index: undefined,
    name: "",
    phone: "",
    email: "",
    address: "",
    gender: "",
    qulification: "",

    // Add initial values for other fields
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <InputLabel>Name</InputLabel>
        <Field name="name" type="text" />
        <ErrorMessage
          name="name"
          className="d-block invalid-feedback"
          component="span"
        />
        <InputLabel>phone</InputLabel>
        <Field name="phone" type="number" />
        <ErrorMessage
          name="phone"
          className="d-block invalid-feedback"
          component="span"
        />

        <InputLabel>Email</InputLabel>
        <Field name="email" type="text" />
        <ErrorMessage
          name="email"
          className="d-block invalid-feedback"
          component="span"
        />
        <InputLabel>Address</InputLabel>
        <Field name="address" type="textarea" />
        <ErrorMessage
          name="address"
          className="d-block invalid-feedback"
          component="span"
        />
        <Typography
          component={"div"}
          style={{ display: "flex", flexDirection: "row" }}
        >
          <label htmlFor="gender">Gender:-</label>
          <div>
            <Field type="radio" name="gender" value="male" id="male" />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <Field type="radio" name="gender" value="female" id="female" />
            <label htmlFor="female">Female</label>
          </div>
          <div>
            <Field type="radio" name="gender" value="other" id="other" />
            <label htmlFor="other">Other</label>
          </div>
        </Typography>
        <ErrorMessage
          name="gender"
          component="span"
          className="d-block invalid-feedback"
        />
        <InputLabel>Qulification</InputLabel>
        <Field as="select" id="qulification" name="qulification">
          <option value="">Select Qulification</option>
          <option value="BCA">BCA</option>
          <option value="BCOM">BCOM</option>
        </Field>
        <ErrorMessage
          name="qulification"
          className="d-block invalid-feedback"
          component="span"
        />
        {/* Add form fields and validation messages for other fields */}
        <Field type="hidden" name="index" />

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Form>
    </Formik>
  );
};

export default CrudForm;
