import axios from "axios";

export function useFile() {
    async function handleFileUpload(file: File) {
        const imageData = new FormData();
        if (file) imageData.append("my_file", file);
        const res = await axios.post(
            "http://localhost:5001/file/v1/upload",
            imageData
        );
        console.log(res);
        console.log("image url: ", res.data.data.url);
        console.log("[image upload] result is: ", res);
        return res.data.data.url;
    }

    return [handleFileUpload];
}
