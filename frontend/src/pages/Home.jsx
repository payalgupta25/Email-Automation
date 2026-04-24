import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Home() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [resume, setResume] = useState(null);


  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const handleSend = async () => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("subject", subject);
      formData.append("body", body);
      formData.append("resume", resume);

      await axios.post("http://localhost:8000/send-email", formData);

      alert("Email Sent Successfully!");
    } catch (error) {
      console.error(error);
      alert("Error sending email");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 items-center justify-center">

        <div className="flex justify-between p-4 bg-gray-100">
            <h1 className="text-xl font-bold">AI Email Agent</h1>

                <button 
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
        </div>

      <div className="bg-white p-8 rounded-xl shadow-md w-[500px]">
        <h1 className="text-2xl font-bold mb-6 text-center">
          AI Email Agent
        </h1>

        <input
          type="email"
          placeholder="Recipient Email"
          className="w-full border p-2 rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Subject"
          className="w-full border p-2 rounded mb-3"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <textarea
          placeholder="Email Body"
          className="w-full border p-2 rounded mb-3"
          rows="4"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <input
          type="file"
          className="mb-4"
          onChange={(e) => setResume(e.target.files[0])}
        />

        <button
          onClick={handleSend}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Send Email
        </button>
      </div>
    </div>
  );
}

export default Home;

