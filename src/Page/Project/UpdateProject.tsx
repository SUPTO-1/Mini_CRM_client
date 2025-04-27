import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../Authentication/axiosInstance";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

const UpdateProject = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    budget: "",
    deadline: new Date(),
    status: "PLANNING",
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axiosInstance.get(`/projects/${id}`);
        const project = response.data;
        setFormData({
          title: project.title,
          budget: project.budget.toString(),
          deadline: new Date(project.deadline),
          status: project.status,
        });
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };
    fetchProject();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/projects/${id}`, {
        title: formData.title,
        budget: parseFloat(formData.budget),
        deadline: formData.deadline.toISOString(),
        status: formData.status,
      });
      Swal.fire("Success!", "Project updated successfully.", "success");
      navigate("/dashboard/viewProjects");
    } catch (error) {
      Swal.fire("Error!", "Failed to update project.", "error");
      console.error("Error updating project:", error);
    }
  };

  return (
    <div className="min-h-screen p-3 md:p-8 lg:p-14">
      <div className="max-w-2xl mx-auto">
        <div className="bg-glass rounded-xl shadow-lg border border-gray-200 p-4 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-[#C65CFF] via-[#B948FF] to-[#7231EC] bg-clip-text text-transparent">Update Project</h1>
          <form onSubmit={handleSubmit} className="space-y-4 bg-glass">
            <div>
              <label className="block mb-2">Title</label>
              <input
                required
                className="w-full p-2 border rounded border-gray-300 focus:ring-2 focus:ring-[#C65CFF] focus:border-[#C65CFF] outline-none transition-all"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block mb-2">Budget</label>
              <input
                required
                type="number"
                className="w-full p-2 border rounded border-gray-300 focus:ring-2 focus:ring-[#C65CFF] focus:border-[#C65CFF] outline-none transition-all"
                value={formData.budget}
                onChange={(e) =>
                  setFormData({ ...formData, budget: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value="PLANNING">Planning</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 md:gap-4 pt-3 md:pt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-3 md:px-6 py-2.5 border border-[#7231EC] rounded-lg hover:text-[#ffffff] hover:bg-[#953DF5] transition-colors"
              >
                Cancel
              </button>
              <button
              type="submit"
              className="px-3 md:px-6 py-2.5 text-[#ffffff] rounded-lg transition-colors duration-200 transform hover:scale-[1.01]"
                style={{ background: 'linear-gradient(90deg, #C65CFF, #B948FF, #953DF5, #7231EC)' }}
            >
              Update Project
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProject;