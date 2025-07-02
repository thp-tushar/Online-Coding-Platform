import axios from "axios";

export type Judge0Submission = {
    language_id: number;
    source_code: string;
    stdin: string;
    expected_output: string;
};

export type Judge0Submissions = {
    submissions: Judge0Submission[];
};

export type Judge0Submit_POST_Response = {
    token: string;
};

export async function Judge0Submit_POST(
    submissionsParam: Judge0Submissions
): Promise<Judge0Submit_POST_Response[] | null> {
    try {
        const response = await axios.post(
            `${process.env.JUDGE0_BASE_API}/submissions/batch?base64_encoded=true`,
            submissionsParam,
            {
                headers: {
                    "X-RapidAPI-Key": process.env.X_RAPID_API_KEY,
                },
            }
        );
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.log("judge0 submit post", err);
        return null;
    }
}

export async function Judge0Submit_GET(tokens: string[] | null) {
    try {
        if (!tokens) return null;

        const tokenParams = tokens.join();
        const response = await axios.get(
            `${process.env.JUDGE0_BASE_API}/submissions/batch?tokens=${tokenParams}&base64_encoded=true`,
            {
                headers: {
                    "X-RapidAPI-Key": process.env.X_RAPID_API_KEY,
                },
            }
        );

        return response.data;
    } catch (err) {
        console.log("judge0 submit get", err);
        return null;
    }
}
