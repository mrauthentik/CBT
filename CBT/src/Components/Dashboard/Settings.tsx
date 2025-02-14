import SideBar from "../SideBar";
import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";

const Settings: React.FC = () => {
  const [examTime, setExamTime] = useState<number>(600);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settingDoc = await getDoc(doc(db, "settings", "exam"));
        if (settingDoc.exists()) {
          setExamTime(settingDoc.data().duration);
        }
      } catch (error: unknown) {
        console.log('Error fetching settings', error);
      }
    };
    fetchSettings();

    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode) {
      setDarkMode(JSON.parse(storedDarkMode) === true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));

    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const handleSave = async () => {
    try {
      await setDoc(doc(db, 'settings', 'global'), { duration: examTime });
      toast.success('Timer settings saved!');
    } catch (error) {
      console.log("Failed to save settings", error);
      toast.error('Failed to save settings');
    }
  };

  return (
    <div className="settings">
      <SideBar />
      <div className='settings-container'>
        <h1>Settings</h1>
        <h2>Exam Timer Settings</h2>
        <label>Set Exam Duration (minutes):</label>
        <input
          type="number"
          value={examTime / 60}
          onChange={(e) => setExamTime(Number(e.target.value) * 60)}
          min={1}
        />
        <button onClick={handleSave} className="save-btn">Save Settings</button>

        <div style={{ marginTop: '20px' }}>
          <label>Dark Mode:</label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;