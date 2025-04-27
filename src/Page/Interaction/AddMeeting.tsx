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
    <div className="p-3 md:p-8 lg:p-14 max-w-2xl mx-auto">
      <div className="bg-glass rounded-xl shadow-sm border border-gray-200 p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#C65CFF] via-[#B948FF] to-[#7231EC] bg-clip-text text-transparent">Log Interaction</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C65CFF] focus:border-[#C65CFF] outline-none transition-all"
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
              className="w-full p-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-[#C65CFF] focus:border-[#C65CFF] outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C65CFF] focus:border-[#C65CFF] outline-none transition-all"
              rows={4}
              required
            />
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              className=" text-[#ffffff] px-3 md:px-6 py-2 rounded-lg transition-colors duration-200 transform hover:scale-[1.01]"
              style={{ background: 'linear-gradient(90deg, #C65CFF, #B948FF, #953DF5, #7231EC)' }}
            >
              Log Interaction
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
  );
};

export default AddMeeting;