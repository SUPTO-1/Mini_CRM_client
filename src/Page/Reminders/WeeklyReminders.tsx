import { useEffect, useState } from "react";
import { axiosInstance } from "../Authentication/axiosInstance";

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
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-bold mb-6">Reminders This Week</h1>
          {loading ? (
            <div className="text-center py-8">Loading reminders...</div>
          ) : (
            <div className="space-y-4">
              {reminders.map((reminder) => (
                <div key={reminder.id} className="p-4 border rounded-lg hover:bg-gray-50">
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