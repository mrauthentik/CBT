import SideBar from "../SideBar";
import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { toast } from "react-toastify";
import "/Users/Kenzy/Desktop/CBT/CBT/src/App.css";

const Settings: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [examTime, setExamTime] = useState<number>(600);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const settingDoc = await getDoc(doc(db, `users/${user.uid}/settings`, "profile"));
        if (settingDoc.exists()) {
          const data = settingDoc.data();
          setFirstName(data.firstName || "");
          setLastName(data.lastName || "");
          setEmail(user.email || "");
          setDepartment(data.department || "");
          setExamTime(data.examTime || 600);
        } else {
          setEmail(user.email || "");
        }
      } catch (error) {
        console.error("Error fetching settings", error);
        toast.error("Failed to load profile");
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const user = auth.currentUser;
      if (!user) {
        toast.error("Please log in to save changes.");
        return;
      }

      if (!firstName.trim() || !lastName.trim()) {
        toast.error("First name and last name are required.");
        return;
      }

      await setDoc(doc(db, `users/${user.uid}/settings`, "profile"), {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: user.email,
        department: department.trim(),
        examTime,
      });

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to save profile", error);
      toast.error("Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="settings">
      <SideBar />
      <div className="settings-container">
        <div className="settings-card">
          <h1>Edit Profile</h1>

          <div className="form-section">
            <h2>Personal Information</h2>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                disabled
                title="Email cannot be changed"
              />
            </div>
            <div className="form-group">
              <label>Department</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Enter department"
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Exam Settings</h2>
            <div className="form-group">
              <label>Exam Duration (minutes)</label>
              <input
                type="number"
                value={examTime / 60}
                onChange={(e) => setExamTime(Number(e.target.value) * 60)}
                min={1}
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className={isSaving ? "save-btn saving" : "save-btn"}
          >
            {isSaving ? (
              <span className="saving-content">
                <svg
                  className="spinner"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="spinner-circle"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="spinner-path"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </span>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;