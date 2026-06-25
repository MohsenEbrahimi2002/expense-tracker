import AuthLayout from "../../components/layout/AuthLayout";
import { Link, useNavigate } from "react-router";
import { validateEmail } from "../../utils/helper";
import { useContext, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { UserContext } from "../../context/UserContext";
import type { AxiosError } from "axios";
import uploadImage from "../../utils/uploadImage";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import Input from "../../components/Inputs/Input";

function SignUp() {
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string>("");

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSignUp = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    let profileImageUrl = "";
    if (!fullName) {
      setError("Please Enter Your Name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password.");
      return;
    }

    setError("");

    //Signup API call
    try {

      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";

      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
      });
      const { token, user } = response.data;
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
      <div className="lg:w-full h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create Account</h3>
        <p className="text-xs text-slate-700 mt-1.25 mb-6">
          please enter your details to create an account
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector
            profilePic={profilePic}
            setProfilePic={setProfilePic}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => setFullName(e.target.value)}
              label="Full Name"
              placeholder="Enter your full name"
            />
            <Input
              value={email}
              onChange={(e:React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="john@example.com"
              label="Email Adress"
              type="email"
            />
            <div className="col-span-2">
              <Input
                value={password}
                onChange={(e:React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                label="Password"
                type="password"
              />
            </div>
          </div>

          {error && <p className="text-red-500 pb-2.5 text-xs">{error}</p>}
          <button type="submit" className="btn-primary">
            Sign Up
          </button>
          <span className="flex items-center gap-2">
            <p className="text-[13px] text-slate-800 mt-3">
              already have an account?{" "}
            </p>
            <Link
              to="/login"
              className="font-medium mt-3 text-primary underline"
            >
              Login
            </Link>
          </span>
        </form>
      </div>
    </AuthLayout>
  );
}

export default SignUp;
