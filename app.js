const apiKey = '04dcc8b6152b4bec839287d56e868bf3';
const main = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');
const defaultSource = 'techcrunch';

window.addEventListener('load', async e => {
    updateNews();
    await updateSources();

    sourceSelector.value = defaultSource;

    sourceSelector.addEventListener('change', e => {
        updateNews(e.target.value);
    });

    if('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('sw.js');
            console.log(`SW registered`);
        } catch (error) {
            console.log(`SW reg failed`);
            
        }
    }
});

async function updateNews(source = defaultSource) {
    const res = await fetch(`https://newsapi.org/v1/articles?source=${source}&apiKey=${apiKey}`)
    const json = await res.json();

    main.innerHTML = json.articles.map(createArticle).join('\n');
}

async function updateSources() {
    const res = await fetch(`https://newsapi.org/v1/sources`);
    const json = await res.json();

    sourceSelector.innerHTML = json.sources
    .map(src => `<option value="${src.id}"> ${src.name}</option>`)
    .join('\n');
}

function createArticle(article) {
    return `
        <div class="article">
            <a href="${article.url}">
                <h2>${article.title}</h2>
                <h6>${article.publishedAt}</h6>
                <img src="${article.urlToImage}" alt="">
                <p>${article.description}</p>
            </a>
        </div>
        `;   
}