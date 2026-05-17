// the intersection observer

// defining a variable that targets the secion elements on the page for our scenes
const sections = document.querySelectorAll("section")

// adds an observer to the intersecting sections, revealing them by adding a "show" class
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting);
        // creating a variable to select the unique elements with an ID, or class depending on whether they're used once or more
        const els2animate = entry.target.querySelectorAll("#carlos, #doorSlide, #carMove, #trashBag, #anglerMove, .trenchMove, #anglerText, #fact1, #fact2, #fact3, #fact4, #fact5, #nr1, #nr2, #nr3, #PlasticSink, #Action, #button");
        els2animate.forEach(el=>{
            // retrieves the class stored in the animation-name attribute allowing the code to add unique classes (animations) for different elements
            const animationClassName = el.getAttribute("data-animation-name");
            if (entry.isIntersecting) {
                // stores the content of the SVG element so it can be reloaded to avoid caching issues (animations playing once, then the image cache loading a finished animation)
                const svgContent = el.innerHTML;
                // reloading the content
                el.innerHTML = svgContent;
                // adding the unique animation for the element if visible
                el.classList.add(animationClassName);
            } else {
                // and removing it when the section moves out of view of the intersection observer
                el.classList.remove(animationClassName);
            }
        });

    });
},{
    threshold: 0.5,
});


// activates the observer for each section
sections.forEach(section=> {
    observer.observe(section)
});


