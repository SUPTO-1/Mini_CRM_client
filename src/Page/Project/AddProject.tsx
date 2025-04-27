import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../Authentication/axiosInstance";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

const AddProject = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    budget: '',
    deadline: new Date(),
    status: 'PLANNING'
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/projects", {
        ...formData,
        clientId: Number(clientId),
        budget: parseFloat(formData.budget),
        deadline: formData.deadline.toISOString()
      });

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Project Created!',
          text: 'Project has been successfully created',
        });
        navigate("/dashboard");
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Creation Failed',
        text: error.response?.data?.error || 'Failed to create project',
      });
      console.error("Error adding project:", error);
    }
  };

  return (
    <div className="min-h-screen p-3 md:p-8 lg:p-14">
      <div className="max-w-4xl mx-auto">
        <div className="bg-glass rounded-xl shadow-sm border border-gray-200 p-4 md:p-8">
          <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#C65CFF] via-[#B948FF] to-[#7231EC] bg-clip-text text-transparent">Add New Project</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2">Title</label>
              <input
                required
                className="w-full p-2 border rounded  border-gray-300 focus:ring-2 focus:ring-[#C65CFF] focus:border-[#C65CFF] outline-none transition-all"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block mb-2">Budget</label>
              <input
                required
                type="number"
                className="w-full p-2 border rounded border-gray-300 focus:ring-2 focus:ring-[#C65CFF] focus:border-[#C65CFF] outline-none transition-all"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              />
            </div>
            <div>
              <label className="block mb-2">Deadline</label>
              <DatePicker
                selected={formData.deadline}
                onChange={(date) => setFormData({ ...formData, deadline: date })}
                className="w-full p-2 border rounded border-gray-300 focus:ring-2 focus:ring-[#C65CFF] focus:border-[#C65CFF] outline-none transition-all"
                minDate={new Date()}
              />
            </div>
            <div>
              <label className="block mb-2">Status</label>
              <select
                className="w-full p-2 border rounded border-gray-300 focus:ring-2 focus:ring-[#C65CFF] focus:border-[#C65CFF] outline-none transition-all"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="PLANNING">Planning</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                className=" text-white px-4 py-2 rounded transition-colors duration-200 transform hover:scale-[1.01]"
                style={{ background: 'linear-gradient(90deg, #C65CFF, #B948FF, #953DF5, #7231EC)' }}
              >
                Add Project
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-3 md:px-6 py-2.5 border border-[#7231EC] rounded-lg hover:text-[#ffffff] hover:bg-[#953DF5] transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProject;