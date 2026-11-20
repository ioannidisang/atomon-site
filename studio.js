(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var nodes = document.querySelectorAll(".reveal");
  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px 12% 0px", threshold: 0.01 });
    nodes.forEach(function (el) { io.observe(el); });
  } else {
    nodes.forEach(function (el) { el.classList.add("in"); });
  }
  if (!reduce) {
    document.querySelectorAll(".hero-media video[data-mp4]").forEach(function (video) {
      var source = document.createElement("source");
      source.src = video.getAttribute("data-mp4");
      source.type = "video/mp4";
      video.appendChild(source);
      video.addEventListener("loadeddata", function () {
        var frame = video.closest(".hero-media");
        if (frame) frame.classList.add("is-playing");
      });
      video.load();
      var play = video.play();
      if (play && play.catch) play.catch(function () {});
    });
  }
})();
