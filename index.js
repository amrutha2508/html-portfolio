function loadContent(page) {
    fetch(page)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            document.getElementById("r2").innerHTML = html;
        })
        .catch(error => {
            document.getElementById("r2").innerHTML = `<p>Error loading content: ${error.message}</p>`;
        });
}
