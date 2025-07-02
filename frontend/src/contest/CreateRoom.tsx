import { useState } from "react";
import io from "socket.io-client";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
const socket = io(import.meta.env.VITE_BACKEND_URL, {
    transports: ["websocket"],
});

console.log(import.meta.env.VITE_BACKEND_URL);

const randomUuid = v4();

export function CreateRoom() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [roomid, setRoomid] = useState(randomUuid);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleClick = (e) => {
        e.preventDefault();
        socket.emit("join-room", { username: username, roomid: roomid });
        navigate(`/room/${roomid}`);
    };

    return (
        <div>
            <h2>Create Room</h2>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                />
            </div>
            <button onClick={handleClick}>Create Room</button>
        </div>
    );
}
