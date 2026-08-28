
    const taglines = [
        "Gateway to Unforgettable Experiences.",
        "Find Your Next Escape, Become Yourself.",
        "Where every stay becomes a story.",
        "The best stories begin somewhere new.",
        "Discover. Stay. Experience. Become.",
        "Somewhere out there feels like home."
    ];

    let taglineIndex = 0;

    const taglineText = document.getElementById("tagline-text");

    function changeTagline() {

        // Fade out
        taglineText.classList.remove("tagline-show");
        taglineText.classList.add("tagline-hide");

        setTimeout(() => {

            // Change the text
            taglineIndex = (taglineIndex + 1) % taglines.length;

            taglineText.textContent = taglines[taglineIndex];

            // Force the browser to recognize the new state
            void taglineText.offsetWidth;

            // Fade in
            taglineText.classList.remove("tagline-hide");
            taglineText.classList.add("tagline-show");

        }, 600);
    }

    // Start the cycle
    setInterval(changeTagline, 3500);

    