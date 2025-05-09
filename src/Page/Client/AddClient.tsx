import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../Authentication/axiosInstance";
import Swal from "sweetalert2";
import { useAuth } from "../Authentication/AutheContext";

const AddClient: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const company = (form.elements.namedItem("company") as HTMLInputElement)
      .value;
    const notes = (form.elements.namedItem("notes") as HTMLInputElement).value;

    const client = { name, phone, email, company, notes, userId: user?.id };
    try {
      const response = await axiosInstance.post("/clients", client);

      if (response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Client Added Successfully",
          icon: "success",
          confirmButtonText: "Okay",
        }).then(() => {
          navigate("/dashboard");
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: response.data.message,
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
    <div className="bg-[#f2edf3] min-h-screen p-3 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-3 md:mb-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center text-gray-600 hover:text-[#9866b3] font-medium transition-colors text-sm md:text-base"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-glass rounded-xl shadow-sm border border-gray-200 p-4 md:p-8">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-[#C65CFF] via-[#B948FF] to-[#7231EC] bg-clip-text text-transparent" >Add New Client</h2>
            <p className="text-gray-600 text-sm md:text-base">Fill in the details below to create a new client profile</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C65CFF] focus:border-[#C65CFF] outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C65CFF] focus:border-[#C65CFF] outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@company.com"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C65CFF] focus:border-[#C65CFF] outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C65CFF] focus:border-[#C65CFF] outline-none transition-all"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  name="notes"
                  rows={4}
                  placeholder="Additional information or comments..."
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C65CFF] focus:border-[#C65CFF] outline-none transition-all"
                ></textarea>
              </div>
            </div>

            <div className="pt-3 md:pt-6">
              <button
                type="submit"
                className="w-full text-[#ffffff] font-semibold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-[1.01]"
                style={{ background: 'linear-gradient(90deg, #C65CFF, #B948FF, #953DF5, #7231EC)' }}
              >
                Add Client
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 inline-block ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClient;
