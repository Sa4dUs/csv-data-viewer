import { ChangeEvent, useEffect, useState } from "react";
import FileUpload from "./components/FileUpload";
import UserList from "./components/UserList";

import User from "./types/User.ts"

function App() {
    const [fileContent, setFileContent] = useState<string | ArrayBuffer | null>(null);
    const [items, setItems] = useState<User[]>([]);
    const [query, setQuery] = useState("");
    const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");

    const fetchItems = () => {
        fetch("http://localhost:3000/api/users")
            .then((res) => res.json())
            .then((data) => setItems(data.data))
            .catch((err) => console.error(err));
    };

    useEffect(fetchItems, []);

    const handleUpload = () => {
        if (!fileContent) return;
        setUploadStatus("uploading");
        const data = { file: fileContent };

        fetch("http://localhost:3000/api/files", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => {
                if (res.ok) {
                    setUploadStatus("success");
                    fetchItems();
                } else {
                    setUploadStatus("error");
                }
            })
            .catch((err) => {
                console.error(err);
                setUploadStatus("error");
            });
    };

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    return (
        <main className="container mx-auto px-4 py-8 dark:bg-gray-800 dark:text-white flex flex-col items-center">
            <div className="w-full lg:w-1/2 flex flex-col items-center space-y-4 mb-4">
                <FileUpload onUpload={setFileContent} />
                <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full ${
                    uploadStatus === "uploading" && "opacity-50 pointer-events-none"
                }`} onClick={handleUpload}>
                    {uploadStatus === "uploading" ? "Uploading..." : "Upload"}
                </button>
                {uploadStatus === "success" && (
                    <div className="text-green-500">Upload successful!</div>
                )}
                {uploadStatus === "error" && (
                    <div className="text-red-500">Upload failed. Please try again.</div>
                )}
                <input className="border border-gray-300 rounded py-2 px-4 w-full" type="text" placeholder="Search..." onChange={handleSearch} />
            </div>
            <UserList items={items} query={query} />
        </main>
    );
}

export default App;
