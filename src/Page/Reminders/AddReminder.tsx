import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../Authentication/axiosInstance";
import Swal from "sweetalert2";

const AddReminder = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    dueDate: "",
    notes: "",
    clientId: "",
    projectId: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        clientId: formData.clientId || undefined,
        projectId: formData.projectId || undefined,
        notes: formData.notes || undefined,
      };

      const response = await axiosInstance.post("/reminders", payload);

      if (response.status === 200) {
        Swal.fire("Success!", "Reminder set successfully", "success");
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error("Error details:", error.response?.data);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.error || "Failed to set reminder",
        html: error.response?.data?.details
          ? `<div>${error.response.data.error}</div><small>${error.response.data.details}</small>`
          : undefined,
        icon: "error",
      });
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-2xl font-bold mb-6">Set Reminder</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Due Date</label>
            <input
              type="datetime-local"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="w-full p-2 border rounded-lg"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Client ID (optional)
              </label>
              <input
                type="text"
                pattern="\d*"
                value={formData.clientId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    clientId: e.target.validity.valid
                      ? e.target.value
                      : formData.clientId,
                  })
                }
                className="w-full p-2 border rounded-lg"
                placeholder="Client ID number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Project ID (optional)
              </label>
              <input
                type="text"
                pattern="\d*"
                value={formData.projectId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    projectId: e.target.validity.valid
                      ? e.target.value
                      : formData.projectId,
                  })
                }
                className="w-full p-2 border rounded-lg"
                placeholder="Project ID number"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Set Reminder
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReminder;
