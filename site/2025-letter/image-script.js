const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");

document.querySelectorAll(".img-row img").forEach(img => {
  img.onclick = () => {
    modalImg.src = img.dataset.full;
    modal.style.display = "flex";
  };
});

modal.onclick = () => {
  modal.style.display = "none";
};

