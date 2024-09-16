const quote = document.getElementById('quote');
const author = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote-btn');  

const api_url = "https://api.quotable.io/random";

async function getQuote(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        quote.innerHTML = data.content;
        author.innerHTML = `— ${data.author}`;
    } catch (error) {
        console.error("Failed to fetch quote:", error);
        quote.innerHTML = "Oops! Something went wrong.";
        author.innerHTML = "";
    }
}


getQuote(api_url);


newQuoteBtn.addEventListener('click', () => {
    getQuote(api_url);
});
