import { useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function UploadPage() {
  const { user } = useUser();
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reader = new FileReader();

    reader.onload = async () => {
      const base64File = reader.result.split(",")[1];

      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          file: `data:image/jpeg;base64,${base64File}`,
          userId: user.id,
        }),
      });

      if (response.ok) {
        alert("Image uploaded successfully!");
      } else {
        alert("Image upload failed!");
      }
    };

    if (file) reader.readAsDataURL(file);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Upload Image</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Upload
        </button>
      </form>
    </div>
  );
}