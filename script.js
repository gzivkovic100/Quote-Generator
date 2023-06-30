const quoteContainer = document.getElementById('quote-generator');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];


// Show loading
function loading () {
    loader.hidden = false;
    quoteContainer.hidden = true;
}


// Hide loading
function hideLoading() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}


// Show New Quote
function newQuote() {
    loading();
    // pick a random quote from apiQoutes array
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    // check is author field is blank and replace it with unknown
    if (!quote.author) {
        authorText.textContent = "Unknown author";
    } else {
        authorText.textContent = quote.author;
    }
    // check the quote length to determine the styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, hide loader
    quoteText.textContent = quote.text;
    hideLoading();
}

// Get quotes from API
async function getQuotes () {
    loading();
    const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        //console.log(apiQuotes[12]); thror only one quote, the 13 quote. Has to be dynamic
        newQuote();
    } catch (err) {
        alert("Something went wrong",err);
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
