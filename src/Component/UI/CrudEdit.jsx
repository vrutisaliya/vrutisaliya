import React, { useContext, useEffect } from "react";
import { CrudContext } from "./CrudContext";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button, InputLabel, Typography } from "@mui/material";
import * as Yup from "yup";
import { useParams, useHistory, useNavigate } from "react-router-dom";

const CrudEdit = () => {
  const { index } = useParams(); // Get the index parameter from the URL
  const navigate = useNavigate();
  const { data, updateData } = useContext(CrudContext);

  // Find the record to edit based on the index
  const recordToEdit = data[index];

  const handleSubmit = (values) => {
    const updatedRecord = { ...values };

    if (!updatedRecord.id) {
      // Generate a new ID if it doesn't exist
      const maxId = Math.max(...data.map((record) => record.id), 0);
      updatedRecord.id = maxId;
    }

    updateData(index, updatedRecord); // Update the record with the new values

    // Redirect back to the list page after updating
    navigate("/list");
  };

  const validationSchema = Yup.object().shape({
    // Add validation rules for your form fields
    name: Yup.string().required("Name is required"),
    phone: Yup.string()
      .required("Mobile number is required")
      .max(10, "Maximum 10 digits")
      .matches(/[0-9]{10}/, {
        message: "Required 10 digits!",
        excludeEmptyString: false,
      }),
    email: Yup.string().email("Invalid email").required("Email is required"),
    address: Yup.string().required("Address is required"),
    gender: Yup.string().required("Gender is required"),
    qulification: Yup.string().required("Qualification is required"),
  });

  const initialValues = {
    
    // Initialize the form fields with the record's values
    name: recordToEdit ? recordToEdit.name : "",
    phone:recordToEdit ? recordToEdit.phone : "",
    email: recordToEdit ? recordToEdit.email : "",
    address: recordToEdit ? recordToEdit.address : "",
    gender: recordToEdit ? recordToEdit.gender : "",
    qulification: recordToEdit ? recordToEdit.qulification : "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        {/* Render your form fields and validation messages here */}
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
          Update
        </Button>
      </Form>
    </Formik>
  );
};

export default CrudEdit;
