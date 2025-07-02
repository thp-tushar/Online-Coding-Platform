import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Homepage } from "./homepage/Homepage";
import { Contest } from "./pages/Contest";
// import { Problems } from "./pages/Problems";
import { Profile } from "./pages/Profile";
import { Signin } from "./auth/Signin/components/Signin";
import { Signup } from "./auth/Signup/components/Signup";
import { CreateProblems } from "./problems/crud_problem/components/CreateProblems";
import { SolveProblem } from "./problems/solve_problem/components/SolveProblem";
import { Toaster } from "react-hot-toast";
import { CreateRoom } from "./contest/CreateRoom";
import JoinRoom from "./contest/JoinRoom";
import { ContestPlayground } from "./contest/ContestPlayground";

function App() {
    const routes = [
        {
            path: "/",
            element: <Homepage />,
        },
        {
            path: "/contest",
            element: <Contest />,
        },
        {
            path: "/problems",
            element: <CreateProblems />,
        },
        {
            path: "/profile",
            element: <Profile />,
        },
        {
            path: "/signin",
            element: <Signin />,
        },
        {
            path: "/signup",
            element: <Signup />,
        },
        {
            path: "/problems/:problem_id",
            element: <SolveProblem />,
        },
        {
            path: "/contest/create-room",
            element: <CreateRoom />,
        },
        {
            path: "/contest/join-room",
            element: <JoinRoom />,
        },
        {
            path: "/room/:roomId",
            element: <ContestPlayground />,
        },
    ];
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {routes.map((route, key) => (
                        <Route
                            key={key}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                </Routes>
            </BrowserRouter>
            {/* for showing toast at global level */}
            <Toaster />
        </>
    );
}

export default App;
