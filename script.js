const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById('result-artist');
const gridArtist = document.getElementById('result-artist-grid');
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`;

    fetch(url)
    .then((response) => response.json())
    .then((result) => displayResults(result))
    .catch((error) => {
        console.error('Error:', error);
    });
}

function displayResults(result) {
    resultPlaylist.classList.add('hidden');
    gridArtist.innerHTML = '';

    result.forEach(element => {
        const artistCard = document.createElement('div');
        artistCard.classList.add('artist-card');

        const cardImg = document.createElement('div');
        cardImg.classList.add('card-img');

        const artistImg = document.createElement('img');
        artistImg.classList.add('artist-img');
        artistImg.src = element.urlImg;
        artistImg.alt = element.name;

        const playDiv = document.createElement('div');
        playDiv.classList.add('play');

        const playIcon = document.createElement('span');
        playIcon.classList.add('fa', 'fa-solid', 'fa-play');

        playDiv.appendChild(playIcon);
        cardImg.appendChild(artistImg);
        cardImg.appendChild(playDiv);

        const cardText = document.createElement('div');
        cardText.classList.add('card-text');

        const artistLink = document.createElement('a');
        artistLink.title = element.name;
        artistLink.classList.add('vst');
        artistLink.href = '';

        const artistName = document.createElement('span');
        artistName.classList.add('artist-name');
        artistName.innerText = element.name;

        const artistCategory = document.createElement('span');
        artistCategory.classList.add('artist-categorie');
        artistCategory.innerText = 'Artista';

        cardText.appendChild(artistLink);
        cardText.appendChild(artistName);
        cardText.appendChild(artistCategory);

        artistCard.appendChild(cardImg);
        artistCard.appendChild(cardText);

        gridArtist.appendChild(artistCard);
    });

    resultArtist.classList.remove('hidden');
}

document.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        resultPlaylist.classList.remove('hidden');
        gridArtist.innerHTML = '';
        resultArtist.classList.add('hidden');
        return;
    }

    requestApi(searchTerm);
});