// CANVAS CODE
// CONSTANTS
if (window.innerWidth > 900) {
  let imageUrls = [
    "https://uploads-ssl.webflow.com/64fe5f36ec4645b5bd5fa642/6552730f6bcc548132b3fe4b_web_Mesa-de-trabajo-1-copia.webp",
    "https://uploads-ssl.webflow.com/64fe5f36ec4645b5bd5fa642/6552730f574fea64b1b3fad3_web_Mesa-de-trabajo-1-copia-4.webp",
    "https://uploads-ssl.webflow.com/64fe5f36ec4645b5bd5fa642/6552730f11ef2872d7a8a7db_web_Mesa-de-trabajo-1-copia-10.webp",
    "https://uploads-ssl.webflow.com/64fe5f36ec4645b5bd5fa642/6552730f46a0696f8a3d2dfd_web_Mesa-de-trabajo-1-copia-8.webp",
    "https://uploads-ssl.webflow.com/64fe5f36ec4645b5bd5fa642/6552730f669145827ef37605_web_Mesa-de-trabajo-1-copia-9.webp",
    "https://uploads-ssl.webflow.com/64fe5f36ec4645b5bd5fa642/65527310b0d678d12267e2b9_web_Mesa-de-trabajo-1-copia-2.webp",
    "https://uploads-ssl.webflow.com/64fe5f36ec4645b5bd5fa642/6552730fef7ecc79fc8305f0_web_Mesa-de-trabajo-1-copia-5.webp",
    "https://uploads-ssl.webflow.com/64fe5f36ec4645b5bd5fa642/65527310c36e738ce980f1ab_web_Mesa%20de%20trabajo%201%20copia%203.webp",
    "https://uploads-ssl.webflow.com/64fe5f36ec4645b5bd5fa642/65527310ef7ecc79fc83067e_web_Mesa%20de%20trabajo%201%20copia%206.webp",
    "https://uploads-ssl.webflow.com/64fe5f36ec4645b5bd5fa642/6552730f7d768f4e29177004_web_Mesa%20de%20trabajo%201.webp",
  ];
  // distance mouse needs to move before next image is shown
  let distThreshold = 300;
  // scale factor to size images
  let scaleFactor = 5;

  // VARIABLES
  // array to hold all of our images
  let images = [];
  // array to hold history of mouse positions and image index for that position
  let queue = [];
  // object containing our last (stored) mouse position
  let lastMousePos = { x: 0, y: 0 };
  // current image to show
  let imgIndex = 0;

  // load all of the images from their urls into the images array
  function preload() {
    for (let i = 0; i < imageUrls.length; i++) {
      images[i] = loadImage(imageUrls[i]);
    }
  }

  // setup canvas and store initial mouse position
  function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent("canvas-parent");
    cnv.style("display", "block");
    cnv.style("position", "absolute");
    cnv.style("inset", "0");
    cnv.style("z-index", "-1");
    lastMousePos = { x: mouseX, y: mouseY };
  }

  function draw() {
    // clear the canvas
    clear();
    background(228, 230, 232, 0);

    // calculate distance between current mouse position and last stored mouse position.
    let d = dist(mouseX, mouseY, lastMousePos.x, lastMousePos.y);

    // If distance is greater than threshold:
    // 1. Add current mouse position and current image index to the front of the queue
    // 2. Update lastMousePos to current mouse position
    // 3. Update imgIndex to next image index
    if (d > distThreshold) {
      queue.unshift({ x: mouseX, y: mouseY, index: imgIndex });
      lastMousePos = { x: mouseX, y: mouseY };
      imgIndex = (imgIndex + 1) % images.length;
    }

    // maintain queue length equal to number of images by removing the last item
    if (queue.length > images.length) {
      queue.pop();
    }

    // define scale of images based on width of canvas
    let scale = width / scaleFactor;

    // draw images in queue
    // draw order is reversed so that the first image in the queue is drawn on top
    for (let i = queue.length - 1; i >= 0; i--) {
      let img = images[queue[i].index];
      if (img) {
        // scale image based on scale factor
        let imgWidth = (img.width * scale) / img.width;
        let imgHeight = (img.height * scale) / img.width;
        // draw image at mouse position offset by half of image width and height
        image(
          img,
          queue[i].x - imgWidth / 2,
          queue[i].y - imgHeight / 2,
          imgWidth,
          imgHeight
        );
      }
    }
  }

  // resize canvas when window is resized
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
}

//MOUSE CODE
//REEL COVER
$(".c-reel_cover").on("mouseenter", function () {
  $(".c-button_main").addClass("is--cursor_blue");
});

$(".c-reel_cover").on("mouseleave", function () {
  $(".c-button_main").removeClass("is--cursor_blue");
});

$(".c-reel_cover").on("click", function () {
  $(".c-button_main").removeClass("is--cursor_blue");
});

$(".w-reel").on("mouseenter", function () {
  $(".cursor-main").addClass("is--invisible");
});

$(".w-reel").on("mouseleave", function () {
  $(".cursor-main").removeClass("is--invisible");
});

//WORK
$(".l-work_landing").on("mouseenter", function () {
  $(".work-hover-cursor").addClass("is--larger_work");
});

$(".l-work_landing").on("mouseleave", function () {
  $(".work-hover-cursor").removeClass("is--larger_work");
});

//CASE STUDIES
$(".c-casestudies1_item").on("mouseenter", function () {
  $(".c-button_main").addClass("is--coming_soon");
});

$(".c-casestudies1_item").on("mouseleave", function () {
  $(".c-button_main").removeClass("is--coming_soon");
});
