import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const UserList = () => {
    const [listOfUsers, setListOfUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                setListOfUsers(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
                setError('Failed to load users');
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="loading">Loading users...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="user-list-container">
            <div className="title-container">
                <h1>🌟 Global Community Hub</h1>
                <p className="subtitle">Discover Amazing People Around the World</p>
            </div>
            <div className="user-grid">
                {listOfUsers.map((user) => (
                    <div key={user.id} className="user-card">
                        <div className="user-avatar">
                            {user.name.charAt(0)}
                        </div>
                        <h2>{user.name}</h2>
                        <p className="user-username">@{user.username}</p>
                        <div className="user-info">
                            <p><i className="fas fa-envelope"></i> {user.email}</p>
                            <p><i className="fas fa-phone"></i> {user.phone}</p>
                            <p><i className="fas fa-globe"></i> {user.website}</p>
                            <p><i className="fas fa-building"></i> {user.company.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserList;