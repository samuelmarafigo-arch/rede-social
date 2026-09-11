document.addEventListener("DOMContentLoaded", () => {
  const likeBtn = document.querySelector(".like-btn");
  const postMedia = document.querySelector(".post-media");
  if (!likeBtn) return;

  const likesCountSpan = likeBtn.querySelector(".likes-count");
  const bookmarkBtn = document.querySelector(".bookmark-btn");

  let isLiked = false;
  let baseLikes = 1200; // Alinhado ao valor inicial estático (1.2K)

  function formatLikes(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  }

  function addLike() {
    if (!isLiked) {
      baseLikes++;
      isLiked = true;
      likeBtn.classList.add("liked");

      if (likesCountSpan) {
        likesCountSpan.textContent = formatLikes(baseLikes);
      }

      const svg = likeBtn.querySelector("svg");
      if (svg) {
        svg.style.transform = "scale(1.3)";
        setTimeout(() => {
          svg.style.transform = "scale(1)";
        }, 150);
      }
    }
  }

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

  // Alterna curtir/descurtir ao clicar no botão
  likeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (isLiked) {
      removeLike();
    } else {
      addLike();
    }
  });

  // Curte ao clicar na imagem
  if (postMedia) {
    postMedia.addEventListener("click", (e) => {
      e.stopPropagation();
      addLike();
    });
  }

  // Alterna o botão de salvar
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