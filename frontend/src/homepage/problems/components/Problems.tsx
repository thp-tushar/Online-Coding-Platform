import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { problemType } from "@zeditor/common";
import { Link } from "react-router-dom";

export const Problems: React.FC = () => {
    const [problems, setProblems] = useState<problemType[]>([]);
    async function getAllProblems() {
        const cookie = Cookies.get("authToken");
        try {
            const res = await axios.get(
                "http://localhost:5001/problemset/v1/allProblems",
                {
                    headers: {
                        Authorization: cookie,
                    },
                }
            );
            console.log(res.data);
            setProblems(res.data.problems);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getAllProblems();
    }, []);
    return (
        <div className="mt-20 ml-10 mr-10 px-10 py-8">
            {problems &&
                problems.map((problem) => (
                    <div className="flex item-center justify-center h-12 w-40 underline cursor-pointer">
                        <Link to={`/problems/${problem._id}`}>
                            {problem.title}
                        </Link>
                    </div>
                ))}
        </div>
    );
};
