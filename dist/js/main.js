if ($(".swiper .swiper-slide").length > 1) {
    const swiper = new Swiper(".swiper", {
        loop: true,
        speed: 750,
        autoplay: {
            delay: 3500,
        },
        scrollbar: {
            el: ".swiper-scrollbar",
        },
        effect: "creative",
        creativeEffect: {
            prev: {
                // will set `translateZ(-400px)` on previous slides
                translate: [0, 0, -400],
            },
            next: {
                // will set `translateX(100%)` on next slides
                translate: ["100%", 0, 0],
            },
        },
    });
}

var acc = document.getElementsByClassName("faq-item_title");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.parentElement.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}

$(".back-to-top").addClass("hidden-top");
$(window).on("scroll", function () {
    if ($(this).scrollTop() === 0) {
        $(".back-to-top").addClass("hidden-top");
    } else {
        $(".back-to-top").removeClass("hidden-top");
    }
});

$(".back-to-top").on("click", function () {
    $("body,html").animate(
        {
            scrollTop: 0,
        },
        0
    );
    return false;
});

const btnOpen = document.querySelector("#btnOpen");
const btnClose = document.querySelector("#btnClose");
const media = window.matchMedia("(width < 40em)");
const topNavMenu = document.querySelector(".topnav__menu");
const main = document.querySelector("main");
const body = document.querySelector("body");

function openMobileMenu() {
    btnOpen.setAttribute("aria-expanded", "true");
    topNavMenu.removeAttribute("inert");
    topNavMenu.removeAttribute("style");
    main.setAttribute("inert", "");
    bodyScrollLockUpgrade.disableBodyScroll(body);
    //btnClose.focus();
}

function closeMobileMenu() {
    btnOpen.setAttribute("aria-expanded", "false");
    topNavMenu.setAttribute("inert", "");
    main.removeAttribute("inert");
    bodyScrollLockUpgrade.enableBodyScroll(body);
    //btnOpen.focus();

    setTimeout(() => {
        topNavMenu.style.transition = "none";
    }, 500);
}

function setupTopNav(e) {
    if (e.matches) {
        // is mobile
        //console.log('is mobile');
        topNavMenu.setAttribute("inert", "");
        topNavMenu.style.transition = "none";
    } else {
        // is tablet/desktop
        //console.log('is desktop');
        closeMobileMenu();
        topNavMenu.removeAttribute("inert");
    }
}

setupTopNav(media);

btnOpen.addEventListener("click", openMobileMenu);
btnClose.addEventListener("click", closeMobileMenu);

media.addEventListener("change", function (e) {
    setupTopNav(e);
});

// Counter Start
var counters = document.querySelectorAll(".counter");
var speed = 200;
counters.forEach(function (counter) {
    var updateCount = function updateCount() {
        var target = +counter.getAttribute("data-target");
        var count = +counter.innerText;
        var inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 1);
        }
    };

    updateCount();
});
$(".counter .form-control").on("change keypress keydown keyup", function () {
    var input = $(this);
    var inputWrapper = input.parent(); // if (inputWrapper.hasClass('counter') == false)

    var maxInputLenght = input.attr("maxlength");
    var inputLength = input.val().length;
    var diff = maxInputLenght - inputLength;
    inputWrapper.attr("data-maxlength", diff);
});
// Counter End

// Header Custom dropdowns
$("header .menu-item").on("click", function () {
    $(this).toggleClass("open").next(".menu-inner").toggleClass("open");
    $(this)
        .parents()
        .siblings()
        .find(".menu-inner, .menu-item")
        .removeClass("open");
    return false;
});

// Closing the dropdown by clicking in the menu button or anywhere in the screen
$("body").on("click", function (e) {
    var target = e.target;
    if (!$(target).is(".menu-item") && !$(target).parents().is(".menu-item")) {
        $(".menu-item, .menu-inner").removeClass("open");
    }
});

// Prevent closing dropdown upon clicking inside the dropdown
$("header .menu-inner").on("click", function (e) {
    e.stopPropagation();
});
