const btn = document.getElementById("btn");
const search = document.getElementById("search");
let debounceTimeOut;
const popularbtn = document.getElementById("popular");
const imgUrl = "https://images.tmdb.org/t/p/w500";
const main = document.getElementById("main");
const upcomingMovies = document.getElementById("upcoming");
const apiKey = "82852eff9923affa42136eb1e81e3ffd";
const tag = document.getElementById("tag");
const baseUrl = "https://api.themoviedb.org/3";
const baseApi =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Mjg1MmVmZjk5MjNhZmZhNDIxMzZlYjFlODFlM2ZmZCIsInN1YiI6IjY1Y2RkNmU5YjA0NjA1MDE4M2RhYjk0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bwdP5nw2Mhimz_wkql8DWsgnNf1hluW2gqV514K7GsM",
  },
};

const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  trendingMovie();
});

btn.addEventListener("click", () => {
  main.innerHTML = "";
  const url = `https://api.themoviedb.org/3/search/movie?query=${search.value}`;

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      data = json.results;

      data
        .forEach((movie) => {
          const movieDiv = document.createElement("div");
          const { title, poster_path, vote_average, overview, id } = movie;
          movieDiv.classList.add("movie");
          movieDiv.innerHTML = `<img src="${
            imgUrl + poster_path
          }" alt="${title}" />

                            <div class="movie-info">
                            <h3>${title}</h3>
                            <span class="${getColor(
                              vote_average
                            )}">${vote_average}</span>
                            </div>
                            <div class="overview">
                            <h3>${title}</h3>
                            ${overview}
                            <br/>
                            <button class="knowmore" id="${id}">En savoir plus</button>
                            
                            </div>`;
          main.appendChild(movieDiv);

          document.getElementById(id).addEventListener("click", () => {
            console.log(id);
            let serie = "movie";
            openNav(movie, serie);
          });
        })
        .catch((err) => console.error("error:" + err));
    });
});

popularbtn.addEventListener("click", () => {
  trendingMovie();
});

function getColor(vote) {
  if (vote > 8) {
    return "green";
  } else if (vote > 5) {
    return "orange";
  } else {
    return "red";
  }
}

upcomingMovies.addEventListener("click", () => {
  main.innerHTML = "";
  const url = `https://api.themoviedb.org/3/trending/tv/week`;

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      console.log(json.results);
      data = json.results;

      data.forEach((series) => {
        const movieDiv = document.createElement("div");
        const { name, poster_path, vote_average, overview, id } = series;
        movieDiv.classList.add("movie");
        movieDiv.innerHTML = `<img src="${
          imgUrl + poster_path
        }" alt="${name}" />
                              <div class="movie-info">
                              <h3>${name}</h3>
                              <span class="${getColor(
                                vote_average
                              )}">${vote_average}</span>
                              </div>
                              <div class="overview">
                              <h3>${name}</h3>
                              ${overview}
                              <br/>
                              <button class="knowmore" id="${id}">En savoir plus</button>
                              </div>`;
        main.appendChild(movieDiv);

        document.getElementById(id).addEventListener("click", () => {
          console.log(id);
          let serie = "tv";
          openNav(series, serie);
        });
      });
    })
    .catch((err) => console.error("error:" + err));
});

setGenre();

let selectedGenre = [];
function setGenre() {
  tag.innerHTML = "";
  genres.forEach((genre) => {
    const tags = document.createElement("div");
    tags.classList.add("tags");
    tags.id = genre.id;
    tags.value = genre.name;
    tags.innerText = `${genre.name}`;
    tag.appendChild(tags);
    tags.addEventListener("click", () => {
      if (selectedGenre.length == 0) {
        selectedGenre.push(genre.id);
      } else {
        if (selectedGenre.includes(genre.id)) {
          selectedGenre.forEach((id, index) => {
            if (id == genre.id) {
              selectedGenre.splice(index, 1);
            }
          });
        } else {
          selectedGenre.push(genre.id);
        }
      }
      console.log(selectedGenre);
      main.innerHTML = "";
      getMovie(baseApi + "&with_genres=" + encodeURI(selectedGenre.join(",")));
      // highlightedSelection();
    });
  });
}

function highlightedSelection() {
  const tags = document.querySelectorAll(".tags");
  tags.foreach((tag) => {
    tag.classList.remove("highlight");
  });
  if (selectedGenre.length != 0) {
    selectedGenre.forEach((id) => {
      const highlightedTag = document.getElementById(id);
      highlightedTag.classList.add("highlight");
    });
  }
}

function trendingMovie() {
  main.innerHTML = "";
  const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc'`;

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      console.log(json.results);
      data = json.results;

      data.forEach((movies) => {
        const movieDiv = document.createElement("div");
        const { title, poster_path, vote_average, overview, id } = movies;
        movieDiv.classList.add("movie");
        movieDiv.innerHTML = `<img src="${
          imgUrl + poster_path
        }" alt="${title}" />

                            <div class="movie-info">
                            <h3>${title}</h3>
                            <span class="${getColor(
                              vote_average
                            )}">${vote_average}</span>
                            </div>
                            <div class="overview">
                            <h3>${title}</h3>
                            ${overview}
                            <br/>
                              <button class="knowmore" id="${id}">En savoir plus</button>
                            </div>`;
        main.appendChild(movieDiv);

        document.getElementById(id).addEventListener("click", () => {
          // console.log(id);
          let type = "movie";
          openNav(movies, type);
        });
      });
    })
    .catch((err) => console.error("error:" + err));
}

function getMovie(url) {
  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      console.log(json.results);
      data = json.results;
      data.forEach((movies) => {
        const movieDiv = document.createElement("div");
        const { title, poster_path, vote_average, overview, id } = movies;
        movieDiv.classList.add("movie");
        movieDiv.innerHTML = `<img src="${
          imgUrl + poster_path
        }" alt="${title}" />

                            <div class="movie-info">
                            <h3>${title}</h3>
                            <span class="${getColor(
                              vote_average
                            )}">${vote_average}</span>
                            </div>
                            <div class="overview">
                            <h3>${title}</h3>
                            ${overview}
                            <br/>
                            <button class="knowmore" id="${id}">En savoir plus</button>
                            </div>`;
        main.appendChild(movieDiv);

        document.getElementById(id).addEventListener("click", () => {
          console.log(id);
          let type = "movie";
          openNav(movies, type);
        });
      });
    })
    .catch((err) => console.error("error:" + err));
}

const overlaycontent = document.getElementById("overlaycontent");

function openNav(movies, type) {
  let id = movies.id;
  fetch(baseUrl + "/" + type + "/" + id + "/videos?", options)
    .then((res) => res.json())
    .then((videoData) => {
      console.log(videoData);
      if (videoData) {
        document.getElementById("myNav").style.width = "100%";
        if (videoData.results.length > 0) {
          let movielements = [];
          let dots = [];
          videoData.results.forEach((video, index) => {
            let { name, key, site } = video;

            if (site == "YouTube") {
              movielements.push(`
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" class="embed hide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            `);

              dots.push(`
              <span class="dot">${index + 1}</span>
            `);
            }
          });

          let content = `
        <h1 id="videotitle">${movies.original_title}</h1>
        <br/>
        <div id="divyoutube">
        ${movielements.join("")}
        </div>
        <br/>

        <div class="dots">${dots.join("")}</div>
        `;

          overlaycontent.innerHTML = content;
          slide = 0;
          showVideos();
        } else {
          overlaycontent.innerHTML = `<h1>Aucun résultat</h1>`;
        }
      }
    });
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}
let slide = 0;
let totalVideos = 0;

function showVideos() {
  let embedClasses = document.querySelectorAll(".embed");
  let dots = document.querySelectorAll(".dot");
  totalVideos = embedClasses.length;
  embedClasses.forEach((embedTag, index) => {
    if (slide == index) {
      embedTag.classList.add("show");
      embedTag.classList.remove("hide");
    } else {
      embedTag.classList.add("hide");
      embedTag.classList.remove("show");
    }
  });

  dots.forEach((dot, index) => {
    if (slide == index) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");

leftArrow.addEventListener("click", () => {
  if (slide > 0) {
    slide--;
  } else {
    slide = totalVideos - 1;
  }
  showVideos();
});

rightArrow.addEventListener("click", () => {
  if (slide < totalVideos - 1) {
    slide++;
  } else {
    slide = 0;
  }
  showVideos();
});

// Fonction pour récupérer les films populaires (par défaut)
async function getPopularMovies() {
  const url = `${baseApi}&api_key=${apiKey}&language=fr-FR`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Afficher les films populaires dans la section 'main'
    main.innerHTML = ""; // Vider l'affichage précédent
    data.results.forEach((movie) => {
      const movieElement = document.createElement("div");
      movieElement.classList.add("movie");

      // Créer un élément HTML pour chaque film
      movieElement.innerHTML = `
        <img src="${imgUrl}${movie.poster_path}" alt="${movie.title}">
        <h3>${movie.title}</h3>
      `;

      // Ajouter l'élément créé à la page
      main.appendChild(movieElement);
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des films populaires:",
      error
    );
    main.innerHTML =
      "<p>Une erreur est survenue. Veuillez réessayer plus tard.</p>";
  }
}

// Fonction pour récupérer les films en fonction de la recherche
async function searchMovies(query) {
  if (query === "") {
    // Si la recherche est vide, on récupère les films populaires par défaut
    getPopularMovies();
    return;
  }

  // URL de l'API de recherche de films
  const url = `${baseUrl}/search/movie?query=${query}&api_key=${apiKey}&language=fr-FR`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Si aucun film n'est trouvé
    if (data.results.length === 0) {
      main.innerHTML = "<p>Aucun film trouvé.</p>";
      return;
    }

    // Afficher les films dans la section 'main'
    main.innerHTML = ""; // Vider l'affichage précédent
    data.results.forEach((movie) => {
      const movieElement = document.createElement("div");
      movieElement.classList.add("movie");

      // Créer un élément HTML pour chaque film
      movieElement.innerHTML = `
        <img src="${imgUrl}${movie.poster_path}" alt="${movie.title}">
        <h3>${movie.title}</h3>
      `;

      // Ajouter l'élément créé à la page
      main.appendChild(movieElement);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des films:", error);
    main.innerHTML =
      "<p>Une erreur est survenue. Veuillez réessayer plus tard.</p>";
  }
}

// Fonction de Debouncing : attend que l'utilisateur cesse de taper pendant 500ms avant d'exécuter la fonction
function debounce(func, delay) {
  // Annule la fonction précédente si l'utilisateur tape rapidement
  clearTimeout(debounceTimeout);
  // Après un délai de `delay` ms, la fonction est exécutée
  debounceTimeout = setTimeout(() => {
    func();
  }, delay);
}

// Ajouter un événement sur la barre de recherche pour détecter les frappes
search.addEventListener("input", (e) => {
  const query = e.target.value; // Récupérer la valeur tapée dans la barre de recherche
  searchMovies(query); // Lancer la recherche des films
});

// Initialiser avec les films populaires par défaut lorsque la page charge
window.onload = getPopularMovies;
