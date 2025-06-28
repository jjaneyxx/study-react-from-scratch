import React, { useState } from 'react';

export const Home = () => {
    const [name, setName] = useState('World');
    return (
    <>
        <h1>Home</h1>
        <h2>State Value: {name}</h2>
        <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
    </>
    );
};
