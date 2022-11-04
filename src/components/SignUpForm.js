import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Form from "./Form";
import TextInput from "./TextInput";

export default function SignUpForm() {
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setData((values) => {
  //     return { ...values, [name]: value };
  //   });
  //   console.log(data);
  // };
  const { signup } = useAuth();
  const navigate = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger;
    if (password !== confirmPassword) {
      setError("Password do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(email, password, username);
      navigate.push("/");
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      setError("Failed to signup");
    }
  };
  return (
    <Form style={{ height: "500px" }} onSubmit={handleSubmit}>
      <TextInput
        type="text"
        placeholder="Enter name"
        icon="person"
        name="username"
        value={username}
        required
        onChange={(e) => setUsername(e.target.value)}
      />

      <TextInput
        type="text"
        placeholder="Enter email"
        icon="alternate_email"
        name="email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextInput
        type="password"
        placeholder="Enter password"
        icon="lock"
        name="password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
      />

      <TextInput
        type="password"
        placeholder="Confirm password"
        icon="lock_clock"
        name="confirmPassword"
        value={confirmPassword}
        required
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Checkbox
        text="I agree to the Terms &amp; Conditions"
        required
        value={agree}
        onChange={(e) => setAgree(e.target.value)}
      />

      <Button type="submit" disabled={loading}>
        <span>Submit Now</span>
      </Button>
      {error && <p className="error">{error}</p>}

      <div className="info">
        Already have an account? <Link to="/login">Login</Link> instead.
      </div>
    </Form>
  );
}
