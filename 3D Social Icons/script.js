let list = document.querySelectorAll(".sci li");
let bg = document.querySelector("body");

list.forEach(element => {
    element.addEventListener("mouseenter", function(event) {
        let color = getComputedStyle(event.target).getPropertyValue("--clr");
        bg.style.backgroundColor = color;
    });

    element.addEventListener("mouseleave", function(event) {
        bg.style.backgroundColor = "#fff";
    });

    VanillaTilt.init(document.querySelectorAll(".sci li a"), {
		max: 25,
		speed: 400,
        glare: true,
	});
});
