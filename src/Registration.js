import React from "react";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import axios from "axios";



const validationSchema = yup.object({
  EmailId: yup
    .string("enter your email")
    .email("enter a vaild email")
    .required("email is required"),

  Password: yup
    .string("enter your Password")
    .min(8, "Password should be of minimum 8 charecters length")
    .required("Password is required"),

  UserType: yup.string("select your type").required("User Type is required "),
});

function Registration() {
  

  const formik = useFormik({
    initialValues: {
      EmailId: "",
      Password: "",
      UserType: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 3));
      console.log(values);

      await axios.post("https://jsonplaceholder.typicode.com/posts",values)
      .then((response) => {
        console.log("submit success",response.data);
      })
      .catch((error)=> {
        console.log("submit error",error);
      });

    },
  });

  return (
    <div
      className="form"
      style={{
        width: "40%",
        alignItems: "center",
        textAlign: "center",
        margin: "30px auto",
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="EmailId"
          label="Email"
          value={formik.values.EmailId}
          onChange={formik.handleChange}
          error={formik.touched.EmailId && Boolean(formik.errors.EmailId)}
          helperText={formik.touched.EmailId && formik.errors.EmailId}
        />
        <br></br>
        <TextField
          fullWidth
          id="password"
          name="Password"
          label="Password"
          value={formik.values.Password}
          onChange={formik.handleChange}
          error={formik.touched.Password && Boolean(formik.errors.Password)}
          helperText={formik.touched.Password && formik.errors.Password}
        />
        <br></br>

        <FormControl   error={formik.touched.UserType && Boolean(formik.errors.UserType)} fullWidth style={{ marginTop: "10px" }}>
          <InputLabel
            id="select-box"
          >
            User Type
          </InputLabel>
          <Select
            name="UserType"
            value={formik.values.UserType}
            onChange={formik.handleChange}
            labelId="select-box"
            id="usertype"
          >
            <MenuItem value={"user"}>User</MenuItem>
            <MenuItem value={"admin"}>Admin</MenuItem>
          </Select>
          <FormHelperText style={{ color: "red" }}>
            {formik.touched.UserType && formik.errors.UserType}
          </FormHelperText>
        </FormControl>
       
        <br></br>

        <Button
          style={{ marginTop: "30px" }}
          color="primary"
          variant="contained"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Registration;
