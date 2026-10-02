import { tracks } from "../data/catalog.js?v=2";

const audio = document.querySelector("#audio");
const playButton = document.querySelector(".play");
const seekControl = document.querySelector(".timeline");
const timeDisplay = document.querySelector(".time");
const trackNumber = document.querySelector(".track-no");
const trackTitle = document.querySelector(".track-title");
const trackMeta = document.querySelector(".track-meta");
const trackList = document.querySelector("#track-list");
const trackStatus = document.querySelector("#track-status");

let selectedTrack = null;

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}

function trackName(track, position) {
  return track.title?.trim() || `Track ${String(position).padStart(2, "0")}`;
}

function trackDetails(track) {
  return [track.creator, track.year, track.category]
    .filter((value) => value !== null && value !== undefined && String(value).trim())
    .join(" · ");
}

function setStatus(message) {
  if (trackStatus) trackStatus.textContent = message;
}

function updateActiveTrack() {
  trackList?.querySelectorAll(".track-list-item").forEach((button) => {
    const isActive = button.dataset.trackId === selectedTrack?.id;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function selectTrack(track, position) {
  if (!audio || !track.fileUrl) {
    setStatus("This recording is unavailable.");
    return;
  }

  selectedTrack = track;
  audio.pause();
  audio.src = track.fileUrl;
  audio.load();

  if (trackNumber) trackNumber.textContent = String(position).padStart(2, "0");
  if (trackTitle) trackTitle.textContent = trackName(track, position);
  if (trackMeta) trackMeta.textContent = trackDetails(track) || track.description || "Unmarked.";
  if (playButton) {
    playButton.disabled = false;
    playButton.textContent = "▶";
    playButton.setAttribute("aria-label", `Play ${trackName(track, position)}`);
  }
  if (seekControl) {
    seekControl.value = "0";
    seekControl.style.setProperty("--progress", "0%");
    seekControl.setAttribute("aria-label", `Seek through ${trackName(track, position)}`);
  }
  if (timeDisplay) timeDisplay.textContent = "0:00";

  setStatus("");
  updateActiveTrack();
}

function createTrackButton(track, position) {
  const button = document.createElement("button");
  const number = document.createElement("span");
  const copy = document.createElement("span");
  const title = document.createElement("strong");
  const metadata = document.createElement("small");

  button.type = "button";
  button.className = "track-list-item";
  button.dataset.trackId = track.id || `track-${position}`;
  button.setAttribute("aria-pressed", "false");

  number.className = "track-list-number";
  number.textContent = String(position).padStart(2, "0");
  title.textContent = trackName(track, position);
  metadata.textContent = trackDetails(track);
  copy.append(title);
  if (metadata.textContent) copy.append(metadata);
  button.append(number, copy);
  button.addEventListener("click", () => selectTrack(track, position));

  return button;
}

function renderTrackList() {
  if (!trackList) return;

  const orderedTracks = [...tracks].sort(
    (first, second) => (first.displayOrder ?? 0) - (second.displayOrder ?? 0),
  );

  if (!orderedTracks.length) {
    const empty = document.createElement("p");
    empty.className = "track-list-empty";
    empty.textContent = "No recordings.";
    trackList.replaceChildren(empty);
    playButton?.setAttribute("disabled", "");
    setStatus("The archive is silent.");
    return;
  }

  const fragment = document.createDocumentFragment();
  orderedTracks.forEach((track, index) => {
    fragment.append(createTrackButton(track, index + 1));
  });
  trackList.replaceChildren(fragment);
  selectTrack(orderedTracks[0], 1);
}

playButton?.addEventListener("click", async () => {
  if (!audio || !selectedTrack) {
    setStatus("Select a recording first.");
    return;
  }

  if (audio.paused) {
    try {
      if (audio.ended || audio.currentTime >= audio.duration) audio.currentTime = 0;
      await audio.play();
      playButton.textContent = "Ⅱ";
      playButton.setAttribute("aria-label", `Pause ${trackTitle?.textContent || "recording"}`);
    } catch {
      setStatus("This recording could not be played.");
    }
  } else {
    audio.pause();
    playButton.textContent = "▶";
    playButton.setAttribute("aria-label", `Play ${trackTitle?.textContent || "recording"}`);
  }
});

audio?.addEventListener("timeupdate", () => {
  const progress = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
  if (seekControl) {
    seekControl.value = String(progress);
    seekControl.style.setProperty("--progress", `${progress}%`);
  }
  if (timeDisplay) timeDisplay.textContent = formatTime(audio.currentTime);
});

function seekToControlValue() {
  if (!audio || !Number.isFinite(audio.duration)) return;
  audio.currentTime = (Number(seekControl.value) / 100) * audio.duration;
  if (timeDisplay) timeDisplay.textContent = formatTime(audio.currentTime);
}

seekControl?.addEventListener("input", seekToControlValue);
seekControl?.addEventListener("change", seekToControlValue);

audio?.addEventListener("loadedmetadata", () => {
  if (timeDisplay) timeDisplay.textContent = `0:00 / ${formatTime(audio.duration)}`;
});

audio?.addEventListener("error", () => {
  setStatus("This recording could not be loaded.");
  if (playButton) {
    playButton.disabled = true;
    playButton.textContent = "▶";
  }
});

audio?.addEventListener("ended", () => {
  if (playButton) {
    playButton.textContent = "▶";
    playButton.setAttribute("aria-label", `Play ${trackTitle?.textContent || "recording"}`);
  }
});

renderTrackList();
