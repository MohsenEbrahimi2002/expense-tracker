import { useContext, useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/Inputs/Input";
import { Link, useNavigate } from "react-router";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import type { AxiosError } from "axios";
import { UserContext, type UserType } from "../../context/UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    setError("");

    //Login Api Call

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user }: { token: string; user: UserType } = response.data;
      console.log(token, user);
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (err) {
      const error = err as AxiosError;
      if (error.response && error.response.data) {
        const data = error.response.data as { message?: string };
        setError(data.message || "Something went wrong. Please try again");
      } else {
        setError("Something went wrong. Please try again");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-1.25 mb-6">
          please enter your details to login to your account
        </p>
        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            label="Email Adress"
            type="email"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimum 8 characters"
            label="Password"
            type="password"
          />

          {error && <p className="text-red-500 pb-2.5 text-xs">{error}</p>}
          <button type="submit" className="btn-primary">
            Login
          </button>
          <span className="flex items-center gap-2">
            <p className="text-[13px] text-slate-800 mt-3">
              Don't have an account?{" "}
            </p>
            <Link
              to="/signup"
              className="font-medium mt-3 text-primary underline"
            >
              Register
            </Link>
          </span>
        </form>
      </div>
    </AuthLayout>
  );
}

export default Login;
