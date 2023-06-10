window.addEventListener('scroll', (e) => {
  let scrolled = window.pageYOffset;
  setTimeout(() => {
    if (scrolled == window.pageYOffset) {
      if (
      scrolled % window.innerHeight >=
      window.innerHeight / 2
      ) {
        window.scrollBy(
          0,
          window.innerHeight -
          (scrolled % window.innerHeight),
        );
      } else {
        window.scrollBy(
          0,
          -(scrolled % window.innerHeight),
        );
      }
    }
  }, 550);
});