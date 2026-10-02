import { artworks } from "../data/catalog.js";

const POSITION_COUNT = 40;
const galleryWall = document.querySelector("#gallery-wall");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox?.querySelector("img");
const closeButton = lightbox?.querySelector(".lightbox-close");

function positionLabel(position) {
  return String(position).padStart(2, "0");
}

function artworkName(artwork, position) {
  return artwork.title?.trim() || `Artwork ${positionLabel(position)}`;
}

function openArtwork(artwork, position) {
  if (!lightbox || !lightboxImage || !artwork.fileUrl) return;

  lightboxImage.src = artwork.fileUrl;
  lightboxImage.alt = artwork.alt?.trim() || artworkName(artwork, position);
  lightbox.showModal();
}

function createArtworkCard(artwork, position) {
  const card = document.createElement("button");
  const image = document.createElement("img");
  const number = document.createElement("span");
  const name = artworkName(artwork, position);

  card.type = "button";
  card.className = "gallery-piece";
  if (position === 1) card.classList.add("gallery-piece-featured");
  card.setAttribute("aria-label", `Open ${name}`);

  image.src = artwork.thumbnailUrl || artwork.fileUrl;
  image.alt = artwork.alt?.trim() || name;
  image.decoding = "async";
  if (position !== 1) image.loading = "lazy";

  number.textContent = positionLabel(position);
  card.append(image, number);
  card.addEventListener("click", () => openArtwork(artwork, position));

  return card;
}

function createEmptyPosition(position) {
  const placeholder = document.createElement("div");
  const number = document.createElement("span");

  placeholder.className = "gallery-piece gallery-placeholder";
  placeholder.setAttribute("aria-label", `Empty position ${position}`);
  number.textContent = positionLabel(position);
  placeholder.append(number);

  return placeholder;
}

function renderGallery() {
  if (!galleryWall) return;

  const orderedArtworks = [...artworks].sort(
    (first, second) => (first.displayOrder ?? 0) - (second.displayOrder ?? 0),
  );
  const artworkByPosition = new Map();

  orderedArtworks.forEach((artwork, index) => {
    const requestedPosition = Number(artwork.displayOrder);
    const position = Number.isInteger(requestedPosition) && requestedPosition > 0
      ? requestedPosition
      : index + 1;

    if (!artworkByPosition.has(position)) artworkByPosition.set(position, artwork);
  });

  const finalPosition = Math.max(POSITION_COUNT, ...artworkByPosition.keys());
  const fragment = document.createDocumentFragment();

  for (let position = 1; position <= finalPosition; position += 1) {
    const artwork = artworkByPosition.get(position);
    fragment.append(
      artwork?.fileUrl
        ? createArtworkCard(artwork, position)
        : createEmptyPosition(position),
    );
  }

  galleryWall.replaceChildren(fragment);
}

closeButton?.addEventListener("click", () => lightbox.close());
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});

renderGallery();
