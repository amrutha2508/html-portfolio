// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Get a reference to the paragraph element inside .selected-option
    const selectedOptionText = document.querySelector('.selected-option p');
    // Get a reference to the content-block div where external HTML will be loaded
    const contentBlock = document.querySelector('.content-block');

    // Get all the button elements once for efficiency
    const buttons = document.querySelectorAll('.buttons-block .block');
    const selectedOptionDisplayTexts = {
        'about': 'About Me',
        'resume': 'Resume',
        'projects': 'Projects',
        'skills': 'Skills'
    };
    /**
     * Function to load HTML content into the content-block div.
     * @param {string} fileName - The name of the HTML file to load (e.g., 'about.html').
     */
    async function loadContent(fileName) {
        if (!contentBlock) {
            console.error("Content block element not found.");
            return;
        }

        try {
            // Construct the full path to the HTML file
            const filePath = `./${fileName}`;
            const response = await fetch(filePath);

            // Check if the request was successful (status code 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} for ${filePath}`);
            }

            // Get the HTML content as text
            const htmlContent = await response.text();

            // Insert the fetched HTML into the content-block div
            contentBlock.innerHTML = htmlContent;
        } catch (error) {
            console.error('Error loading content:', error);
            // Display an error message to the user
            contentBlock.innerHTML = `<p style="color: red; text-align: center;">Error loading content. Please try again later.</p>`;
        }
    }

    // Loop through each button using a 'for' loop with 'let'
    for (let i = 0; i < buttons.length; i++) {
        const currentButton = buttons[i];

        currentButton.addEventListener("click", function() {
            // Get the text content of the button (e.g., "about", "resume")
            const buttonText = currentButton.textContent.toLowerCase(); // Convert to lowercase
            const displayText = selectedOptionDisplayTexts[buttonText] || buttonText; // Get predefined text or fallback
            
            if (selectedOptionText) {
                selectedOptionText.textContent = displayText;
            }

            // Optional: Add/remove a class to visually indicate the selected button
            buttons.forEach(btn => btn.classList.remove('active-button'));
            currentButton.classList.add('active-button');

            // NEW ACTION: Load the corresponding HTML file
            // Convert button text (e.g., "about") to a filename (e.g., "about.html")
            const htmlFileName = `${buttonText}.html`;
            loadContent(htmlFileName);
        });
    }


    // Set initial selected option text and load initial content on page load
    // This ensures 'about.html' is loaded by default.
    if (selectedOptionText) {
        const initialButton = document.querySelector('.about.block');
        if (initialButton) {
            const initialButtonText = selectedOptionDisplayTexts[initialButton.textContent.toLowerCase()];
            selectedOptionText.textContent = initialButtonText;
            initialButton.classList.add('active-button');
        } else {
            // Fallback: If 'about' button isn't found, still set 'about' as text
            selectedOptionText.textContent = 'About';
        }
        // Always load 'about.html' as the default content
        loadContent('about.html');
    }
});