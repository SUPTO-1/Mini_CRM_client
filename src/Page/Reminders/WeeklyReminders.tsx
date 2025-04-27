import { useEffect, useState } from "react";
import { axiosInstance } from "../Authentication/axiosInstance";
import { Link } from "react-router-dom";

interface Reminder {
  id: number;
  title: string;
  dueDate: string;
  notes: string;
  status: string;
  client: { name: string } | null;
  project: { title: string } | null;
}

const WeeklyReminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await axiosInstance.get("/reminders/weekly");
        setReminders(response.data);
      } catch (error) {
        console.error("Error fetching reminders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReminders();
  }, []);

  return (
    <div className="p-4 md:p-8 h-screen">
      <div className="mb-2">
        <Link
          to="/dashboard"
          className="inline-flex items-center text-sm md:text-base hover:text-[#9866b3] font-medium transition-colors"
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
        <div className="bg-glass rounded-xl shadow-sm border border-gray-200 p-4 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#C65CFF] via-[#B948FF] to-[#7231EC] bg-clip-text text-transparent mb-4 md:mb-8">Reminders This Week</h1>
          {loading ? (
            <div className="text-center py-8">Loading reminders...</div>
          ) : (
            <div className="space-y-4">
              {reminders.map((reminder) => (
                <div key={reminder.id} className="p-2 md:p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{reminder.title}</h3>
                      <p className="text-sm text-gray-600">
                        Due: {new Date(reminder.dueDate).toLocaleString()}
                      </p>
                      {reminder.notes && (
                        <p className="text-sm text-gray-600 mt-1">{reminder.notes}</p>
                      )}
                    </div>
                    <div className="text-sm">
                      {reminder.client?.name || reminder.project?.title || 'General'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeeklyReminders;