import { useEffect, useState } from "react";
import { axiosInstance } from "../Authentication/axiosInstance";
import Swal from "sweetalert2";

interface Interaction {
  id: number;
  date: string;
  type: string;
  notes: string;
  client: { name: string } | null;
  project: { title: string } | null;
}

const ViewLogs = () => {
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInteractions();
  }, []);

  const fetchInteractions = async () => {
    try {
      const response = await axiosInstance.get("/interactions");
      setInteractions(response.data);
    } catch (error) {
      console.error("Error fetching interactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/interactions/${id}`);
        Swal.fire("Deleted!", "Interaction has been deleted.", "success");
        fetchInteractions();
      } catch (error) {
        Swal.fire("Error!", "Failed to delete interaction.", "error");
      }
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Interaction Logs</h1>
          {loading ? (
            <div className="text-center py-8">Loading interactions...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Type</th>
                    <th className="text-left py-3 px-4">Related To</th>
                    <th className="text-left py-3 px-4">Notes</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {interactions.map((interaction) => (
                    <tr key={interaction.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4">
                        {new Date(interaction.date).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 capitalize">{interaction.type.toLowerCase()}</td>
                      <td className="py-3 px-4">
                        {interaction.client?.name || interaction.project?.title || '-'}
                      </td>
                      <td className="py-3 px-4">{interaction.notes}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleDelete(interaction.id)}
                          className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewLogs;