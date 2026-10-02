import { films } from "../data/catalog.js?v=4";

const video = document.querySelector("#video");
const stage = document.querySelector(".video-stage");
const filmName = document.querySelector("#film-name");
const filmMeta = document.querySelector("#film-meta");
const filmStatus = document.querySelector("#film-status");
const filmList = document.querySelector("#film-list");

let selectedFilm = null;

function filmTitle(film, position) {
  return film.title?.trim() || `Film ${String(position).padStart(2, "0")}`;
}

function filmDetails(film) {
  return [film.creator, film.year, film.category]
    .filter((value) => value !== null && value !== undefined && String(value).trim())
    .join(" · ");
}

function setStatus(message) {
  if (filmStatus) filmStatus.textContent = message;
}

function updateActiveFilm() {
  filmList?.querySelectorAll(".film-list-item").forEach((button) => {
    const isActive = button.dataset.filmId === selectedFilm?.id;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function selectFilm(film, position) {
  if (!video || !film.fileUrl) {
    setStatus("This film is unavailable.");
    return;
  }

  selectedFilm = film;
  video.pause();
  video.src = film.fileUrl;
  video.poster = film.posterUrl || "";
  video.load();
  stage?.classList.add("has-video");
  if (filmName) filmName.textContent = filmTitle(film, position);
  if (filmMeta) filmMeta.textContent = filmDetails(film) || film.description || "Unmarked.";
  setStatus("");
  updateActiveFilm();
}

function createFilmButton(film, position) {
  const button = document.createElement("button");
  const number = document.createElement("span");
  const title = document.createElement("strong");
  button.type = "button";
  button.className = "film-list-item";
  button.dataset.filmId = film.id || `film-${position}`;
  button.setAttribute("aria-pressed", "false");
  number.textContent = String(position).padStart(2, "0");
  title.textContent = filmTitle(film, position);
  button.append(number, title);
  button.addEventListener("click", () => selectFilm(film, position));
  return button;
}

function renderFilmList() {
  if (!filmList) return;
  const orderedFilms = [...films].sort((first, second) => (first.displayOrder ?? 0) - (second.displayOrder ?? 0));
  if (!orderedFilms.length) {
    filmList.textContent = "No films.";
    setStatus("The archive is still.");
    return;
  }
  const fragment = document.createDocumentFragment();
  orderedFilms.forEach((film, index) => fragment.append(createFilmButton(film, index + 1)));
  filmList.replaceChildren(fragment);
  selectFilm(orderedFilms[0], 1);
}

video?.addEventListener("error", () => setStatus("This film could not be loaded."));
renderFilmList();
