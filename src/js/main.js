// ---- Circle progress bar ----//

const sharedOptions = {
  strokeWidth: 2,
  trailWidth: 1,
  text: {
    style: {
      position: "absolute",
      left: "50%",
      top: "50%",
      padding: 0,
      margin: 0,
      fontSize: "3.8em",
      fontWeight: "600",
      transform: {
        prefix: true,
        value: " rotateZ(-150deg) translate(50%, -0.4em)"
      }
    }
  },
  duration: 800,
  easing: "easeOut",
  step: (state, bar) => {
    bar.setText(Math.round(bar.value() * 100));
  }
};

const projects = new ProgressBar.Circle("#projects", {
  ...sharedOptions,
  color: "#f5483a"
});

const clients = new ProgressBar.Circle("#clients", {
  ...sharedOptions,
  color: "#009989"
});

const months = new ProgressBar.Circle("#months", {
  ...sharedOptions,
  color: "#152a3b"
});

window.addEventListener("scroll", animateProgresCircles);
const features = document.querySelector(".features");

function animateProgresCircles() {
  if (window.innerHeight > features.getBoundingClientRect().top + 200) {
    projects.animate(0.5);
    clients.animate(0.35);
    months.animate(0.8);
  }
}

// ---- Navigation menu -----------//

const navigation = document.querySelector(".navigation");
navigation.addEventListener("click", toggleMenu);

function toggleMenu() {
  navigation.classList.toggle("is-active");
}

const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 500,
  header: ".header",
  offset: -1
});


