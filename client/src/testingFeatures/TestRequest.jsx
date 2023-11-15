import { useEffect, useState } from 'react';


export  default function TestRequest() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3030/jsonstore/games")
        .then(response=> response.json())
        .then(result => setGames(Object.values(result)));

        
    }, []);
console.log(games);
    return (
        <section id="catalog-page">
            <h1>All Games</h1>

    

        </section>
    );
}


