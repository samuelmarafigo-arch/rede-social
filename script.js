document.addEventListener("DOMContentLoaded", () => {
  const likeBtn = document.querySelector(".like-btn");
  const postMedia = document.querySelector(".post-media");
  if (!likeBtn) return;

  const likesCountSpan = likeBtn.querySelector(".likes-count");
  const bookmarkBtn = document.querySelector(".bookmark-btn");

  let isLiked = false;
  let baseLikes = 0; // Contador iniciando zerado

  // Formata o número (ex: 0, 1, 2, 1.000)
  function formatLikes(num) {
    return num.toLocaleString("pt-BR");
  }

  // Define o valor inicial como 0 na tela assim que o JS carregar
  if (likesCountSpan) {
    likesCountSpan.textContent = formatLikes(baseLikes);
  }

  // Adiciona curtida (+1)
  function addLike() {
    if (!isLiked) {
      baseLikes++;
      isLiked = true;
      likeBtn.classList.add("liked");

      if (likesCountSpan) {
        likesCountSpan.textContent = formatLikes(baseLikes);
      }

      // Animação de pulso no coração
      const svg = likeBtn.querySelector("svg");
      if (svg) {
        svg.style.transform = "scale(1.3)";
        setTimeout(() => {
          svg.style.transform = "scale(1)";
        }, 150);
      }
    }
  }

  // Remove curtida (-1)
  function removeLike() {
    if (isLiked) {
      isLiked = false;
      baseLikes = Math.max(0, baseLikes - 1);
      likeBtn.classList.remove("liked");

      if (likesCountSpan) {
        likesCountSpan.textContent = formatLikes(baseLikes);
      }
    }
  }

  // Alterna curtir (0 -> 1) e descurtir (1 -> 0) ao clicar no botão
  likeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (isLiked) {
      removeLike();
    } else {
      addLike();
    }
  });

  // Curte ao clicar na foto
  if (postMedia) {
    postMedia.addEventListener("click", (e) => {
      e.stopPropagation();
      addLike();
    });
  }

  // Botão de salvar
  if (bookmarkBtn) {
    let isBookmarked = false;
    bookmarkBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      isBookmarked = !isBookmarked;
      bookmarkBtn.classList.toggle("bookmarked", isBookmarked);

      const svg = bookmarkBtn.querySelector("svg");
      if (svg) {
        svg.style.transform = "scale(1.2)";
        setTimeout(() => {
          svg.style.transform = "scale(1)";
        }, 150);
      }
    });
  }
});