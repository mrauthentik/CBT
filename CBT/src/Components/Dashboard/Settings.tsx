import SideBar from "../SideBar";
import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { toast } from "react-toastify";

const Settings: React.FC = () => {
  const [examTime, setExamTime] = useState<number>(600);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const settingDoc = await getDoc(doc(db, `users/${user.uid}/settings/timer`, ));
        if (settingDoc.exists()) {
          const data = settingDoc.data();
          setExamTime(data.duration);

          if (data.darkMode) {
            document.body.classList.add("dark-mode");
          } else {
            document.body.classList.remove("dark-mode");
          }
        }
      } catch (error) {
        console.error("Error fetching settings", error);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        toast.error("You need to be logged in to save settings.");
        return;
      }

      await setDoc(doc(db, `users/${user.uid}/settings/timer`, ), {
        duration: examTime,
        darkMode,
      });
      console.log('User time set', )
      toast.success("Settings saved 🚀!");
    } catch (error) {
      console.error("Failed to save settings", error);
      toast.error("Failed to save settings");
    }
  };

  return (
    <div className="settings">
      <SideBar />
      <div className="settings-container">
        <h1>Settings</h1>
        <h2>Exam Timer Settings</h2>
        <label>Set Exam Duration (minutes):</label>
        <input
          type="number"
          value={examTime / 60}
          onChange={(e) => setExamTime(Number(e.target.value) * 60)}
          min={1}
        />
        <button onClick={handleSave} className="save-btn">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
