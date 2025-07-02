import { useState } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
const socket = io(import.meta.env.VITE_BACKEND_URL, {
    transports: ["websocket"],
});

export default function JoinRoom() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [roomid, setRoomid] = useState("");

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleRoomidChange = (e) => {
        setRoomid(e.target.value);
    };

    const handleClick = (e) => {
        e.preventDefault();
        socket.emit("join-room", { username: username, roomid: roomid });
        navigate(`/room/${roomid}`);
    };

    return (
        <div>
            <h2>Join Room</h2>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                />
            </div>
            <div>
                <label htmlFor="password">Room ID</label>
                <input
                    type="text"
                    id="roomid"
                    value={roomid}
                    onChange={handleRoomidChange}
                />
            </div>
            <br />
            <button onClick={handleClick}>Enter Contest</button>
            {/* <button>Hi</button> */}
        </div>
    );
}
