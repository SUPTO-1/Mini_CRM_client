import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../Authentication/axiosInstance";
import Swal from "sweetalert2";

interface Project {
  id: number;
  title: string;
  budget: number;
  deadline: string;
  status: string;
  client: {
    name: string;
  };
}

const ViewProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get("/projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId: number) => {
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
        await axiosInstance.delete(`/projects/${projectId}`);
        Swal.fire("Deleted!", "Project has been deleted.", "success");
        fetchProjects();
      } catch (error) {
        Swal.fire("Error!", "Failed to delete project.", "error");
      }
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-2">
        <Link
          to="/dashboard"
          className="inline-flex items-center hover:text-[#9866b3] font-medium transition-colors text-sm md:text-base"
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#C65CFF] via-[#B948FF] to-[#7231EC] bg-clip-text text-transparent text-center mb-8">
            Project List
          </h1>
          {loading ? (
            <div className="text-center py-8">Loading projects...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4">Title</th>
                    <th className="text-left py-3 px-4">Client</th>
                    <th className="text-left py-3 px-4">Budget</th>
                    <th className="text-left py-3 px-4">Deadline</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4">{project.title}</td>
                      <td className="py-3 px-4">{project.client.name}</td>
                      <td className="py-3 px-4">
                        ${project.budget.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        {new Date(project.deadline).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full ${
                            project.status === "COMPLETED"
                              ? "bg-green-100 text-green-800"
                              : project.status === "IN_PROGRESS"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Link
                          to={`/dashboard/updateProject/${project.id}`}
                          className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex flex-col space-y-4 lg:flex-row lg:space-x-2 mb-2"
                        >
                          Update
                        </Link>
                        <Link
                          to={`/dashboard/addMeeting/project/${project.id}`}
                          className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 flex flex-col space-y-4 lg:flex-row lg:space-x-2  mb-2"
                        >
                          Meeting
                        </Link>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 flex flex-col space-y-4 lg:flex-row lg:space-x-2"
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

export default ViewProjects;
