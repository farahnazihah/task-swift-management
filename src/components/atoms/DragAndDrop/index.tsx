import React, { useEffect, useState } from "react";

function DragDrop() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
    if (!file) {
      setMessage("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const error = await res.text(); // Changed to .text() to see the HTML response
        console.error("Error response:", error);
        setMessage(`Error: ${res.statusText}`);
        return;
      }

      const result = await res.json();
      setMessage("File uploaded successfully");
    } catch (error) {
      console.error("Fetch error:", error);
      setMessage(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    fetch("/api/upload").then((res) => {
      console.log(res.json());
    });
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      <div>{message}</div>
      {file && <div>Selected file: {file.name}</div>}
    </>
  );
}

export default DragDrop;
