function initSite() {
  // Posts used Layzr with empty src + data-normal — resolve to real sources
  var lazyImgs = document.querySelectorAll("img[data-normal]");
  for (var i = 0; i < lazyImgs.length; i++) {
    var img = lazyImgs[i];
    var src = img.getAttribute("data-normal");
    if (src) {
      img.setAttribute("src", src);
      img.setAttribute("loading", "lazy");
      // Keep markdown-provided alt; only fill a last-resort label if missing
      if (!img.getAttribute("alt")) {
        img.setAttribute("alt", "");
      }
      img.removeAttribute("data-normal");
    }
  }

  var navbar = document.querySelector(".navbar");
  if (navbar) {
    var onScroll = function () {
      if (window.pageYOffset > 50) {
        navbar.classList.add("top-nav-short");
      } else {
        navbar.classList.remove("top-nav-short");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  initBigImgs();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSite);
} else {
  initSite();
}

function initBigImgs() {
  var bigImgEl = document.getElementById("header-big-imgs");
  if (!bigImgEl) return;

  var numImgs = parseInt(bigImgEl.getAttribute("data-num-img"), 10) || 0;
  if (numImgs < 1) return;

  var header = document.querySelector(".intro-header.big-img");
  var descEl = document.querySelector(".img-desc");

  function getImgInfo() {
    var randNum = Math.floor(Math.random() * numImgs) + 1;
    return {
      src: bigImgEl.getAttribute("data-img-src-" + randNum),
      desc: bigImgEl.getAttribute("data-img-desc-" + randNum)
    };
  }

  function setImg(src, desc) {
    if (!header) return;
    header.style.backgroundImage = "url(" + src + ")";
    if (descEl) {
      if (desc) {
        descEl.textContent = desc;
        descEl.style.display = "block";
      } else {
        descEl.style.display = "none";
      }
    }
  }

  var first = getImgInfo();
  setImg(first.src, first.desc);

  if (numImgs < 2 || !header) return;

  function cycle() {
    var info = getImgInfo();
    var prefetch = new Image();
    prefetch.src = info.src;

    setTimeout(function () {
      var transition = document.createElement("div");
      transition.className = "big-img-transition";
      transition.style.backgroundImage = "url(" + info.src + ")";
      header.insertBefore(transition, header.firstChild);

      setTimeout(function () {
        transition.style.opacity = "1";
      }, 50);

      setTimeout(function () {
        setImg(info.src, info.desc);
        if (transition.parentNode) {
          transition.parentNode.removeChild(transition);
        }
        cycle();
      }, 1000);
    }, 6000);
  }

  cycle();
}
