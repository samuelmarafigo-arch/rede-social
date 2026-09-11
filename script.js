document.addEventListener("DOMContentLoaded", () => {
  const likeBtn = document.querySelector(".like-btn");
  const postMedia = document.querySelector(".post-media");
  if (!likeBtn) return;

  const likesCountSpan = likeBtn.querySelector(".likes-count");
  const bookmarkBtn = document.querySelector(".bookmark-btn");

  let baseLikes = 0; // Começa em 0

  // Formata o número (ex: 1, 2, 10, 1.000)
  function formatLikes(num) {
    return num.toLocaleString("pt-BR");
  }

  // Define o valor inicial como 0 na tela
  if (likesCountSpan) {
    likesCountSpan.textContent = formatLikes(baseLikes);
  }

  // Função para somar +1 a CADA clique
  function addLike() {
    baseLikes++; // Incrementa +1 sem travar
    likeBtn.classList.add("liked"); // Mantém o coração ativado (vermelho)

    if (likesCountSpan) {
      likesCountSpan.textContent = formatLikes(baseLikes);
    }

    // Efeito de pulso no coração a cada clique
    const svg = likeBtn.querySelector("svg");
    if (svg) {
      svg.style.transform = "scale(1.4)";
      setTimeout(() => {
        svg.style.transform = "scale(1)";
      }, 150);
    }
  }

  // Clique no botão de curtir -> Soma +1
  likeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    addLike();
  });

  // Clique na foto/mídia -> Soma +1
  if (postMedia) {
    postMedia.addEventListener("click", (e) => {
      e.stopPropagation();
      addLike();
    });
  }

  // Botão de salvar (bookmark)
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