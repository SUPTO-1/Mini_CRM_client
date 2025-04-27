import { useState} from "react";
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
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Title</label>
          <input
            required
            className="w-full p-2 border rounded"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>
        <div>
          <label className="block mb-2">Budget</label>
          <input
            required
            type="number"
            className="w-full p-2 border rounded"
            value={formData.budget}
            onChange={(e) => setFormData({...formData, budget: e.target.value})}
          />
        </div>
        <div>
          <label className="block mb-2">Deadline</label>
          <DatePicker
            selected={formData.deadline}
            onChange={(date) => setFormData({...formData, deadline: date})}
            className="w-full p-2 border rounded"
            minDate={new Date()}
          />
        </div>
        <div>
          <label className="block mb-2">Status</label>
          <select
            className="w-full p-2 border rounded"
            value={formData.status}
            onChange={(e) => setFormData({...formData, status: e.target.value})}
          >
            <option value="PLANNING">Planning</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Project
        </button>
      </form>
    </div>
  );
};

export default AddProject;