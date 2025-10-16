const tlLeave = gsap.timeline({
  defaults: { duration: 0.75, ease: "power2.easeOut" },
});

const tlEnter = gsap.timeline({
  defaults: { duration: 0.75, ease: "power2.easeOut" },
});

// make the funtions for leave and enter animations

const leaveAnimations = (current, done) => {
  const product = current.querySelector(".image-container");
  const text = current.querySelector(".showcase-text");
  const circles = current.querySelectorAll(".circle");
  const arrow = current.querySelector(".showcase-arrow");
  return (
    tlLeave.fromTo(arrow, { opacity: 1, y: 0 }, { opacity: 0, y: 50 }),
    // tlLeave.to(current, { zIndex: 1 }, "<"),
    tlLeave.fromTo(
      product,
      { opacity: 1, y: 0 },
      { opacity: 0, y: 100, onComplete: done },
      "<"
    ),
    tlLeave.fromTo(
      text,
      { opacity: 1, y: 0 },
      { opacity: 0, y: 100, onComplete: done },
      "<"
    ),
    tlLeave.fromTo(
      circles,
      { opacity: 1, y: 0 },
      {
        opacity: 0,
        y: -200,
        onComplete: done,
        stagger: 0.15,
        ease: "back.out(1.7)",
        duration: 1,
      },
      "<"
    )
  );
};

//changing gradient
function getGradient(name) {
  switch (name) {
    case "handbag":
      return "linear-gradient(260deg , #b75d62 , #754d4f)";

    case "boots":
      return "linear-gradient(260deg , #5d8cb7 , #4c4f70)";

    case "hat":
      return "linear-gradient(260deg , #b27a5c , #7f5450)";
  }
}

const enterAnimation = (next, done, gradient) => {
  const product = next.querySelector(".image-container");
  const text = next.querySelector(".showcase-text");
  const circles = next.querySelectorAll(".circle");
  const arrow = next.querySelector(".showcase-arrow");

  return (
    tlEnter.fromTo(arrow, { y: -50, opacity: 0 }, { opacity: 1, y: 0 }),
    tlEnter.to("body", { background: gradient }, "<"),
    tlEnter.fromTo(
      product,
      { y: -200, opacity: 0 },
      { opacity: 1, y: 0, onComplete: done }
    ),
    tlEnter.fromTo(
      text,
      { opacity: 0, y: 200 },
      { opacity: 1, y: 0, onComplete: done },
      "<"
    ),
    tlEnter.fromTo(
      circles,
      { opacity: 0, y: -200 },
      {
        opacity: 1,
        y: 0,
        onComplete: done,
        stagger: 0.15,
        ease: "back.out(1.7)",
        duration: 1,
      },
      "<"
    )
  );
};

const productEnterAnimation = (next, done) => {
  tlEnter.fromTo(next, { opacity: 0, y: "100%" }, { y: "0%", opacity: 1 });
  tlEnter.fromTo(
    ".card",
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, stagger: 0.15, onComplete: done }
  );
};

const productLeaveAnimation = (current, done) => {
  tlLeave.fromTo(
    current,
    { y: "0%" },
    { y: "100%", opacity: 0, onComplete: done }
  );
};

barba.init({
  preventRunning: true,
  transitions: [
    {
      name: "default",
      once(data) {
        const done = this.async();
        let next = data.next.container;
        let gradient = getGradient(data.next.namespace);
        gsap.set("body", { background: gradient });
        enterAnimation(next, done, gradient);
      },
      leave(data) {
        const done = this.async();

        let current = data.current.container;

        leaveAnimations(current, done);
      },
      enter(data) {
        const done = this.async();
        let next = data.next.container;
        let gradient = getGradient(data.next.namespace);
        enterAnimation(next, done, gradient);
      },
    },
    {
      name: "product-page",
      sync: true,
      from: { namespace: ["handbag", "product-section"] },
      to: { namespace: ["product-section", "handbag"] },
      enter(data) {
        const done = this.async();
        let next = data.next.container;
        productEnterAnimation(next, done);
      },
      leave(data) {
        const done = this.async();
        let current = data.current.container;
        productLeaveAnimation(current, done);
      },
    },
  ],
});
