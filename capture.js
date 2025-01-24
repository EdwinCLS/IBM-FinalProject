function handleSearch() {
  const searchTerm = document.getElementById("search").value.toLowerCase();

  fetchData(searchTerm);
}

function fetchData(searchItem) {
  fetch("travel_recommendation.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); // Verifica los datos en la consola
      const filterData = data.filter((item) =>
        item.name.toLowerCase().includes(searchItem)
      );
      console.log(filterData);
      showRecommendations(filterData);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function showRecommendations(data) {
  const recommendationsContainer = document.getElementById("recommendations"); // Contenedor en tu HTML

  recommendationsContainer.innerHTML = "";

  if (!recommendationsContainer) {
    console.error("El contenedor #recommendations no se encuentra en el DOM.");
    return;
  }
  data.forEach((destination) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = ` 
    
    <h2>${destination.cities[0].name}</h2>
      <img src="${destination.cities[0].imageURL}" alt="${destination.name}" />
      <p>${destination.cities[0].description}</p>
    `;
    recommendationsContainer.appendChild(card);
  });
}

function clearSearch() {
  const recommendationsContainer = document.getElementById("recommendations");
  const campo = document.getElementById("search");
  campo.value = "";
  recommendationsContainer.innerHTML = "";
}
