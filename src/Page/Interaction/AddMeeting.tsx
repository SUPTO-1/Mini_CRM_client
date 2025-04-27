import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../Authentication/axiosInstance";
import Swal from "sweetalert2";

const AddMeeting = () => {
    const { clientId, projectId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      date: "",
      type: "MEETING",
      notes: "",
    });
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await axiosInstance.post("/interactions", {
          ...formData,
          clientId: clientId ? parseInt(clientId) : undefined,
          projectId: projectId ? parseInt(projectId) : undefined
        });
        Swal.fire("Success!", "Interaction logged successfully", "success");
        navigate(-1);
      } catch (error) {
        console.error(error);
        Swal.fire("Error!", "Failed to log interaction", "error");
      }
    };
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-2xl font-bold mb-6">Log Interaction</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="CALL">Call</option>
              <option value="MEETING">Meeting</option>
              <option value="EMAIL">Email</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="datetime-local"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full p-2 border rounded-lg"
              rows={4}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Log Interaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMeeting;