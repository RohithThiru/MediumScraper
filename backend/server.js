const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Enable CORS for all routes

async function searchMedium(query) {
    let browser;
    try {
        browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setDefaultTimeout(90000); // Increase timeout to 90 seconds
        await page.goto(`https://medium.com/search?q=${encodeURIComponent(query)}`, { waitUntil: 'networkidle2' });

        console.log('Page content loaded');

        await page.waitForSelector('article', { timeout: 90000 });

        const results = await page.evaluate(() => {
            const articles = Array.from(document.querySelectorAll('article'));
            return articles.slice(0, 5).map(article => {
                const titleElement = article.querySelector('h2');
                const urlElement = article.querySelector('a');
                const blogUrlElement = article.querySelector('a[href*="medium.com"]');
                const dateElement = article.querySelector('span.meta__date');

                const title = titleElement ? titleElement.innerText : 'No title';
                const url = urlElement ? urlElement.href : 'No URL';
                const blogUrl = blogUrlElement ? blogUrlElement.href : 'No blog URL';

                const authorRegex = /@([^\/]+)\?/;
                const authorMatch = url.match(authorRegex);
                const author = authorMatch ? authorMatch[1] : 'Unknown author';

                const date = dateElement ? dateElement.innerText : 'Unknown date';

                return { title, url, blogUrl, author, date };
            });
        });

        console.log("results", results);
        return results;
    } catch (error) {
        console.error('Error during Puppeteer scraping:', error);
        throw new Error('Failed to scrape Medium');
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

app.get('/search', async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    try {
        const results = await searchMedium(query);

        if (results.length > 0) {
            res.json(results);
        } else {
            res.status(404).json({ error: 'No results found' });
        }
    } catch (error) {
        console.error('Error handling /search request:', error);
        res.status(500).json({ error: error.message });
    }
});

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
