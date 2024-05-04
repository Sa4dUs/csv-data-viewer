import { ChangeEvent, useState } from "react";

export default function FileUpload({ onUpload }: { onUpload: (content: string | ArrayBuffer | null) => void }) {
    const [fileName, setFileName] = useState<string | null>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name); // Set the file name for feedback
            const reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = (e: ProgressEvent<FileReader>) => {
                if (e.target?.result) {
                    onUpload(e.target.result);
                } else {
                    onUpload(null);
                }
            };
            reader.onerror = (e: ProgressEvent<FileReader>) => {
                console.error("Cannot read file.", e.target?.error);
                onUpload(null);
            };
        } else {
            setFileName(null); // Reset file name when no file selected
            onUpload(null);
        }
    };

    return (
        <label className="block w-full">
            <input
                type="file"
                className="hidden"
                onChange={handleChange}
                accept=".csv"
            />
            <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 cursor-pointer w-full text-center hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mx-auto mb-2 text-gray-600 dark:text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-400">{fileName || "Select a file"}</span>
            </div>
        </label>
    );
}
