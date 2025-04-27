import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../Authentication/axiosInstance";
import Swal from "sweetalert2";

interface ClientFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
}

const UpdateClient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ClientFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    notes: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await axiosInstance.get(`/clients/${id}`);
        const client = response.data;

        setFormData({
          name: client.name,
          email: client.email,
          phone: client.phone,
          company: client.company || "",
          notes: client.notes || ""
        });
        setError("");
      } catch (err) {
        setError("Failed to load client data");
        Swal.fire("Error!", "Could not fetch client details", "error");
        navigate("/dashboard/viewClients");
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [id, navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.put(`/clients/${id}`, formData);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Client Updated!",
          text: "Changes saved successfully",
        });
        navigate("/dashboard/viewClients");
      }
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.response?.data?.message || "Could not update client",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading Client Data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-3 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-3 md:mb-6">
          <Link
            to="/dashboard/viewClients"
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
            Back to Client
          </Link>
        </div>

        <div className="bg-glass rounded-xl shadow-lg border border-gray-200 p-4 md:p-8">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#C65CFF] via-[#B948FF] to-[#7231EC] bg-clip-text text-transparent">Update Client</h1>
            <p className="text-gray-600 mt-2 text-sm md:text-base">
              Modify the fields you want to update
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C65CFF] focus:border-[#C65CFF] outline-none transition-all"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C65CFF] focus:border-[#C65CFF] outline-none transition-all"
                  required
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C65CFF] focus:border-[#C65CFF] outline-none transition-all"
                  required
                />
              </div>

              {/* Company Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C65CFF] focus:border-[#C65CFF] outline-none transition-all"
                />
              </div>

              {/* Notes Field */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C65CFF] focus:border-[#C65CFF] outline-none transition-all"
                  placeholder="Additional information about the client"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-2 md:gap-4 pt-3 md:pt-6">
              <button
                type="button"
                onClick={() => navigate("/dashboard/viewClients")}
                className="px-3 md:px-6 py-2.5 border border-[#7231EC] rounded-lg hover:text-[#ffffff] hover:bg-[#953DF5] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 md:px-6 py-2.5 text-[#ffffff] rounded-lg transition-colors duration-200 transform hover:scale-[1.01]"
                style={{ background: 'linear-gradient(90deg, #C65CFF, #B948FF, #953DF5, #7231EC)' }}
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateClient;