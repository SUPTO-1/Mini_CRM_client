import React from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { axiosInstance } from "./axiosInstance";

const Register: React.FC = () => {
  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const location = formData.get("location") as string;

    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    const userData = { name, email, phone, password, location };

    try {
      const res = await axiosInstance.post("/signup", userData);
      if (res.status === 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Signup Successful",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          form.reset();
          window.location.href = "/";
        });
      }
    } catch (err: any) {
      Swal.fire({
        title: "error!",
        text: err.response.data.message,
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f2edf3] px-4 py-2">
      <div className="w-full max-w-md bg-white p-3 md:p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center bg-gradient-to-r from-[#C65CFF] via-[#B948FF] to-[#7231EC] bg-clip-text text-transparent">
          Create Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="mt-1 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#953DF5]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="mt-1 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#953DF5]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              required
              className="mt-1 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#953DF5]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="mt-1 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#953DF5]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              className="mt-1 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#953DF5]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              required
              className="mt-1 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#953DF5]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#953DF5] hover:bg-[#bb84f6] text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            Signup
          </button>
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/" className="text-[#953DF5] hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
