function showPopup(params = {}) {
  let config = {
    text: params.text || "Link is inactive. This is a demo website",
    color: params.color || "black",
    background: params.background || "#ffffff",
    displayTime: params.displayTime || 2500,
    selector: params.selector || 'a[href="#"]'
  };

  const body = document.querySelector("body");
  body
    .querySelectorAll(config.selector)
    .forEach(link => link.addEventListener("click", handleClick));

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    const { x, y, position } = getElementCoords(this);
    addPopupToDom(x, y, position);
  }

  function getElementCoords(element) {
    const coords = element.getBoundingClientRect();
    const isfixed = isFixed(element);
    return {
      x: coords.left + (isfixed ? 0 : window.scrollX) + coords.width / 2 - 30,
      y: coords.top + (isfixed ? 0 : window.scrollY) + coords.height / 2 + 10,
      position: isfixed ? "fixed" : "absolute"
    };
  }

  function isFixed(elem) {
    do {
      if (getComputedStyle(elem).position == "fixed") return true;
    } while ((elem = elem.offsetParent));
    return false;
  }

  function addPopupToDom(x, y, position) {
    const p = document.createElement("p");
    const div = document.createElement("div");
    const div2 = document.createElement("div");

    p.style.cssText = `
      background: ${config.background}; 
      color: ${config.color};
      position: ${position};
      padding: 20px; 
      top: ${y}px;
      left: ${x}px;
      border-radius: 10px;
      box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
      z-index: 7;
      opacity: 0; 
      transition: 700ms
      `;
    p.innerText = config.text;

    div.style.cssText = `
      position: absolute;
      top: -10px;
      left: 20px;
      transform: rotateZ(45deg);
      width: 20px;
      height: 20px;
      background: ${config.background};
      box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
    `;

    div2.style.cssText = `
      position: absolute;
      top: 0;
      left: 10px;
      width: 40px;
      height: 20px;
      background: ${config.background};
    `;
    p.appendChild(div);
    p.appendChild(div2);
    body.appendChild(p);

    setTimeout(() => {
      p.style.opacity = "1";
    }, 10);
    removePopupFromDom(p, config.displayTime);
  }

  function removePopupFromDom(p, time) {
    setTimeout(() => {
      p.style.opacity = "0";
    }, time);
    setTimeout(() => {
      body.removeChild(p);
    }, time + 1000);
  }
}