import { useState } from "react";

export default function Timer(props) {
   // const date = Date();
    const [count, setCount] = useState(45);

    return (
        <div className="counter">
            <h3>Days until the trip: {count}</h3>
            <button onClick={() => setCount(count => count-1)}>-</button>
        </div>
    )
}