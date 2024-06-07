<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <h1>Medium Scraper</h1>
    <h2>Overview</h2>
    <p><strong>Medium Scraper</strong> is a web application that allows users to search for articles on Medium.com based on a query. The backend is built with Node.js, Express, and Puppeteer, while the frontend is built with React. The application scrapes Medium for articles and displays the results to the user with options to sort the articles by date.</p>
    <h2>Features</h2>
    <ul>
        <li><strong>Search for Medium articles</strong> based on a query.</li>
        <li>Display search results including the title, author, and publication date.</li>
        <li><strong>Sort results</strong> by publication date.</li>
        <li>Cache search results in local storage.</li>
        <li>Responsive design.</li>
    </ul>
    <h2>Tech Stack</h2>
    <h3>Backend</h3>
    <ul>
        <li><strong>Node.js:</strong> JavaScript runtime environment.</li>
        <li><strong>Express:</strong> Web framework for Node.js.</li>
        <li><strong>Puppeteer:</strong> Headless Chrome Node.js API for web scraping.</li>
    </ul>
    <h3>Frontend</h3>
    <ul>
        <li><strong>React:</strong> JavaScript library for building user interfaces.</li>
        <li><strong>axios:</strong> Promise-based HTTP client for the browser and Node.js.</li>
        <li><strong>react-spinners:</strong> Collection of loading spinners for React.</li>
        <li><strong>react-icons:</strong> SVG icons for React.</li>
    </ul>
    <h3>Other</h3>
    <ul>
        <li><strong>Cors:</strong> Middleware for enabling Cross-Origin Resource Sharing.</li>
    </ul>
    <h2>Installation</h2>
    <h3>Prerequisites</h3>
    <ul>
        <li>Node.js (>= 12.x)</li>
        <li>npm (>= 6.x)</li>
        <li>Git</li>
    </ul>
    <h3>Steps</h3>
    <ol>
        <li>
            <p><strong>Clone the repository:</strong></p>
            <pre><code>git clone https://github.com/your-username/MediumScraper.git
cd MediumScraper</code></pre>
        </li>
        <li>
            <p><strong>Backend Setup:</strong></p>
            <p>Navigate to the <code>backend</code> directory:</p>
            <pre><code>cd backend</code></pre>
            <p>Install dependencies:</p>
            <pre><code>npm install</code></pre>
        </li>
        <li>
            <p><strong>Frontend Setup:</strong></p>
            <p>Navigate to the <code>frontend</code> directory:</p>
            <pre><code>cd ../frontend</code></pre>
            <p>Install dependencies:</p>
            <pre><code>npm install</code></pre>
        </li>
    </ol>
    <h2>Usage</h2>
    <h3>Running the Backend</h3>
    <ol>
        <li>Navigate to the <code>backend</code> directory:
            <pre><code>cd backend</code></pre>
        </li>
        <li>Start the backend server:
            <pre><code>node app.js</code></pre>
        </li>
    </ol>
    <h3>Running the Frontend</h3>
    <ol>
        <li>Navigate to the <code>frontend</code> directory:
            <pre><code>cd ../frontend</code></pre>
        </li>
        <li>Start the frontend development server:
            <pre><code>npm start</code></pre>
        </li>
    </ol>
    <h3>Accessing the Application</h3>
    <p>Open your web browser and navigate to <code>http://localhost:3000</code> to access the application.</p>
    <h2>API Endpoints</h2>
    <h3>GET /search</h3>
    <p>Search for Medium articles based on a query.</p>
    <p><strong>Request:</strong></p>
    <ul>
        <li>Query Parameter: <code>q</code> (string, required)</li>
    </ul>
    <p><strong>Example:</strong></p>
    <pre><code>GET /search?q=JavaScript</code></pre>
    <p><strong>Response:</strong></p>
    <ul>
        <li>200 OK: JSON array of articles.</li>
        <li>400 Bad Request: If the query parameter is missing.</li>
        <li>500 Internal Server Error: If an error occurs during scraping.</li>
    </ul>
    <p><strong>Sample Response:</strong></p>
    <pre><code class="code-block">[
  {
    "title": "Understanding JavaScript Promises",
    "url": "https://medium.com/@author/understanding-javascript-promises-12345",
    "blogUrl": "https://medium.com/understanding-javascript-promises",
    "author": "author",
    "date": "Jan 1, 2023"
  },
  ...
]</code></pre>
    <h2>Environment Variables</h2>
    <p>Create a <code>.env</code> file in the <code>backend</code> directory to define the following environment variables:</p>
    <ul>
        <li><code>PORT</code>: Port number on which the backend server will run (default: 3000).</li>
    </ul>
    <h2>Contributing</h2>
    <p>Contributions are welcome! Please follow these steps to contribute:</p>
    <ol>
        <li>Fork the repository.</li>
        <li>Create a new branch:
            <pre><code>git checkout -b feature/your-feature</code></pre>
        </li>
        <li>Make your changes and commit them:
            <pre><code>git commit -m "Add feature"</code></pre>
        </li>
        <li>Push to the branch:
            <pre><code>git push origin feature/your-feature</code></pre>
        </li>
        <li>Open a pull request on GitHub.</li>
    </ol>
    <h2>License</h2>
</body>
</html>
