import { Link, useLocation, useNavigate } from "react-router-dom";
import loginImage from "../../../Images/login.jpg";
import Swal from "sweetalert2";
import { useAuth } from "./AutheContext";
import { axiosInstance } from "./axiosInstance";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {login} = useAuth();
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    const userData = { email, password };

    try {
      const res = await axiosInstance.post("/login", userData);
      if (res.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Login Successfully",
          icon: "success",
          confirmButtonText: "Okay",
        }).then(() => {
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            login(res.data.user, res.data.token);
            const from = location.state?.from?.pathname || "/dashboard";
            navigate(from, { replace: true });
          } else {
            console.error("No token received in response");
          }
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: res.data.message,
          icon: "error",
          confirmButtonText: "Okay",
        });
      }
    } catch (err: any) {
      Swal.fire({
        title: "Error!",
        text: err.response?.data?.message || "Something went wrong",
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  };

  return (
    <div className="min-h-screen p-2 bg-[#f2edf3] flex items-center justify-center">
      <div className="flex flex-col lg:flex-row items-center md:w-8/12 mx-auto mt-5 lg:max-w-5xl p-4 lg:p-0 bg-white shadow-lg rounded-lg">
        <div className="w-full lg:w-1/2 p-6">
          <img
            src={loginImage}
            alt="Login"
            className="w-7/12 md:w-1/2 md:h-1/2 mx-auto lg:w-full lg:h-auto object-cover rounded-lg"
          />
        </div>
        <div className="w-full lg:w-1/2 lg:p-6 p-3">
          <h2 className="text-2xl font-semibold text-center mb-6 bg-gradient-to-r from-[#C65CFF] via-[#B948FF] to-[#7231EC] bg-clip-text text-transparent">
            Login To Your Account
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#953DF5]"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#953DF5]"
                placeholder="Password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#953DF5] hover:bg-[#bb84f6] text-white font-semibold py-2 px-4 rounded-md transition duration-200"
            >
              Login
            </button>
            <p className="text-center text-sm mt-4">
              Don't have an account?{" "}
              <Link to="/register" className="text-[#953DF5] hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
