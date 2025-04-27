import { useEffect, useState } from "react";
import { GoPerson } from "react-icons/go";
import { MdOutlineDriveFileMove } from "react-icons/md";
import { axiosInstance } from "../Page/Authentication/axiosInstance";
import { useAuth } from "../Page/Authentication/AutheContext";
import { Link } from "react-router-dom";

const DataOverview = () => {
  const [totalClients, setTotalClients] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalInteractions, setTotalInteractions] = useState(0);
  useEffect(() => {
    const fetchTotalClients = async () => {
      try {
        const response = await axiosInstance.get("/clients/counts");
        setTotalClients(response.data.count);
      } catch (error) {
        console.log("client error", error);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchTotalClients();
    }
  }, [user]);

  useEffect(() => {
    const fetchTotalProjects = async () => {
      try {
        const response = await axiosInstance.get("/projects/count");
        setTotalProjects(response.data.count);
      } catch (error) {
        console.log("project error", error);
      }
    };
    if (user) {
      fetchTotalProjects();
    }
  }, [user]);

  useEffect(() => {
    const fetchTotalInteractions = async () => {
      try {
        const response = await axiosInstance.get("/interactions/count");
        setTotalInteractions(response.data.count);
      } catch (error) {
        console.log("interaction error", error);
      }
    };
    if (user) {
      fetchTotalInteractions();
    }
  }, [user]);

  if (loading) {
    return <div className="w-11/12 mx-auto pt-16">Loading client count...</div>;
  }

  return (
    <div className="w-11/12 mx-auto pt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div
        className="h-60 rounded-xl p-8 col-span-1 relative"
        style={{
          background:
            "linear-gradient(50deg, #FFD89A, #FFB88C, #FF6F91, #FF8AAE)",
        }}
      >
        <h1 className="text-xl text-white font-medium">Total Client</h1>
        <h1 className="flex gap-1 mt-4 items-end text-white text-7xl font-medium">
          {totalClients} <GoPerson className="text-6xl" />
        </h1>
        <Link
          to="viewClients"
          className="absolute bottom-4 right-4 bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all"
        >
          View Clients
        </Link>
      </div>
      <div
        className="h-60 rounded-xl p-8 col-span-1 relative"
        style={{
          background:
            "linear-gradient(50deg, #9EC2FF, #7B9FF2, #5E7EE0, #4259C3)",
        }}
      >
        <h1 className="text-xl text-white font-medium">Total Projects</h1>
        <h1 className="flex gap-1 mt-4 items-end text-white text-7xl font-medium">
          {totalProjects} <MdOutlineDriveFileMove className="text-6xl" />
        </h1>
        <Link
          to="viewProjects"
          className="absolute bottom-4 right-4 bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all"
        >
          View Projects
        </Link>
      </div>
      <div
        className="h-60 rounded-xl p-8 col-span-1 relative"
        style={{
          background:
            "linear-gradient(50deg, #B3E7D0, #82DFC6, #52D5B2, #23BB98)",
        }}
      >
        <h1 className="text-xl text-white font-medium">Interactions</h1>
        <h1 className="flex gap-1 mt-4 items-end text-white text-7xl font-medium">
          {totalInteractions}
        </h1>
        <Link
          to="viewLogs"
          className="absolute bottom-4 right-4 bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all"
        >
          View Logs
        </Link>
      </div>
    </div>
  );
};

export default DataOverview;
