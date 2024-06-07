import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { DotLoader } from 'react-spinners';
import { CiFilter } from "react-icons/ci"; // Import IoIosArrowDown icon from react-icons/io

function Loader() {
    return (
        <div className="loader-container">
            <DotLoader color="#36D7B7" loading={true} size={50} />
        </div>
    );
}

function App() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [sortAsc, setSortAsc] = useState(true); // State to manage sorting direction

    const fetchData = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`http://localhost:3000/search?q=${encodeURIComponent(query)}`);
            if (!response.data || !Array.isArray(response.data)) {
                throw new Error('Invalid response from server');
            }
            let sortedResults = response.data.sort((a, b) => new Date(a.publishedDate) - new Date(b.publishedDate));
            if (!sortAsc) sortedResults.reverse();
            setResults(sortedResults);
            localStorage.setItem('searchResults', JSON.stringify(sortedResults));
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const loadCachedData = () => {
        const cachedResults = localStorage.getItem('searchResults');
        if (cachedResults) {
            setResults(JSON.parse(cachedResults));
        }
    };

    useEffect(() => {
        loadCachedData();
        const savedQuery = localStorage.getItem('searchQuery');
        if (savedQuery) {
            setQuery(savedQuery);
        }
    }, []);

    const handleSearch = async (event) => {
        event.preventDefault();
        await fetchData();
        localStorage.setItem('searchQuery', query);
    };

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSort = () => {
        setSortAsc(!sortAsc);
        setResults(results.reverse()); // Toggle sort direction
    };

    return (
        <div className="App">
            <h1>Medium Search</h1>
            <form className="form" onSubmit={handleSearch}>
                <div className="input-container">
                    <input
                        className="input"
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        placeholder="Enter search term"
                    />
                </div>
                <button className="sort-button" onClick={handleSort}><CiFilter className='filter-icon'/></button> {/* Change filter icon */}
                <button className="button" type="submit">Search</button>
            </form>
            {loading ? (
                <Loader />
            ) : (
                <div className="results">
                    {error && <p className="error">{error}</p>}
                    {results.length > 0 ? (
                        results.map((result, index) => (
                            <a key={index} href={result.blogUrl} className="result-link">
                                <div className="result">
                                    <h3>{result.title}</h3>
                                    <p>Author: {result.author}</p>
                                    <p>Published Date: {new Date(result.publishedDate).toLocaleDateString()}</p>
                                    <a href={result.blogUrl} className="blog-link">Read blog</a>
                                    <br />
                                    <a href={result.url} target="_blank" rel="noopener noreferrer">Author Details</a>
                                </div>
                            </a>
                        ))
                    ) : (
                        <p>No results found</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
