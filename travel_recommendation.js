const clear_Button = document.getElementById('clear-btn')
const searchInput = document.getElementById("input-search")
const searchButton = document.getElementById("search-btn")

clear_Button.addEventListener("click", () => {
    searchInput.value = '';
});

searchButton.addEventListener("click", searchButton_fn);

function searchButton_fn() {
    fetch('travel_recommendation_api.json').then(function (response) {
        return response.json()
    }).then(function (data) {
        let recommendationsArray = [];
        let searchInput_new = searchInput.value.toLowerCase()
        if (searchInput_new === 'beach') {
            recommendationsArray = data.beaches;
        } else if (searchInput_new === 'temple') {
            recommendationsArray = data.temples;
        } else if (searchInput_new === 'country') {
            recommendationsArray = data.countries;
        }

        let recommendationHtml = '';

        if (recommendationsArray.length > 0) {
            for (const recommendation of recommendationsArray) {
                recommendationHtml += `
                        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        <div class="col">
                        <div class="card m-2 p-3"> 
                        <img src="${recommendation.imageUrl}" alt="Image of ${recommendation.name}">
                        <div class="card-body">
                        <h2 class="text-dark">${recommendation.name}</h2>
                        <p class="text-dark">${recommendation.description}</p>
                        </div>
                        </div>
                        </div>
                        </div>
                    `;
            }
        } else {
            recommendationHtml = '<p>No recommendationsArray found.</p>';
        }
        console.log(recommendationsArray.length)
        console.log('recommendationHtml-->', recommendationHtml)
        document.getElementById('recommendation').innerHTML = recommendationHtml;

        console.log(data);


    }).catch(function (error) {
        console.error("Somthis error happend", error)
    })
}

function getRecommendations() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    let recommendationsArray = [];

    if (searchTerm === 'beach') {
        recommendationsArray = data.beaches;
    } else if (searchTerm === 'temple') {
        recommendationsArray = data.temples;
    } else if (searchTerm === 'country') {
        recommendationsArray = data.countries;
    } else {
        recommendationsArray = [];
    }

    let recommendationHtml = '';

    if (recommendationsArray.length > 0) {
        for (const recommendation of recommendationsArray) {
            recommendationHtml += `
                        <h2>${recommendation.name}</h2>
                        <img src="${recommendation.imageUrl}" alt="Image of ${recommendation.name}">
                        <p>${recommendation.description}</p>
                    `;
        }
    } else {
        recommendationHtml = '<p>No recommendationsArray found.</p>';
    }

    document.getElementById('recommendation').innerHTML = recommendationHtml;
}
