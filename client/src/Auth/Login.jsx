import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "../BASE_URL";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(BASE_URL+"/api/users/login", data);
      console.log(response.data);
      alert(response.data.message);
    } catch (error) {
      console.error(error.response.data);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Email:</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p style={styles.error}>{errors.email.message}</p>}
        </div>
        <div style={styles.inputGroup}>
          <label>Password:</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Must be at least 6 characters" },
            })}
          />
          {errors.password && <p style={styles.error}>{errors.password.message}</p>}
        </div>
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "100px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "center",
  },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  inputGroup: { textAlign: "left" },
  error: { color: "red", fontSize: "0.8em" },
  button: { padding: "10px", backgroundColor: "#007BFF", color: "#fff", border: "none", cursor: "pointer" },
};

export default Login;
