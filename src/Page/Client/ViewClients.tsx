import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../Authentication/axiosInstance";
import Swal from "sweetalert2";

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  notes: string | null;
}

const ViewClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axiosInstance.get("/clients");
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (clientId: number) => {
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
        await axiosInstance.delete(`/clients/${clientId}`);
        Swal.fire("Deleted!", "Client has been deleted.", "success");
        fetchClients();
      } catch (error) {
        Swal.fire("Error!", "Failed to delete client.", "error");
      }
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-2">
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
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#C65CFF] via-[#B948FF] to-[#7231EC] bg-clip-text text-transparent">Client List</h1>
            <Link
              to="/dashboard/addClient"
              className="bg-[#52D5B2] text-white px-4 py-2 rounded-lg hover:bg-[#23BB98] transition-colors text-sm md:text-base"
            >
              Add New Client
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-8">Loading clients...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-left py-3 px-4">Phone</th>
                    <th className="text-left py-3 px-4">Company</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4">{client.name}</td>
                      <td className="py-3 px-4">{client.email}</td>
                      <td className="py-3 px-4">{client.phone}</td>
                      <td className="py-3 px-4">{client.company || "-"}</td>
                      <td className="py-3 px-4 space-x-2 space-y-4">
                        <Link
                          to={`/dashboard/updateClient/${client.id}`}
                          className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Update
                        </Link>
                        <button
                          onClick={() => handleDelete(client.id)}
                          className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Delete
                        </button>
                        <Link
                          to={`/dashboard/addProject/${client.id}`}
                          className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Project
                        </Link>
                        <Link
                          to={`/dashboard/addMeeting/client/${client.id}`}
                          className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          Meeting
                        </Link>
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

export default ViewClients;
