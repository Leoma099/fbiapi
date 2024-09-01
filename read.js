let item = {};

console.log(window.location);

const urlParams = new URLSearchParams(window.location.search);
const uid = urlParams.get('uid');

async function getData() {
    try {
        const response = await fetch(`https://api.fbi.gov/@wanted-person/${uid}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const record = await response.json();
        console.log(record); // Inspect the fetched record

        // Extracting the required fields, aliases, and images
        item = {
            title: record.title,
            nationality: record.nationality || 'N/A',
            sex: record.sex || 'N/A',
            status: record.status || 'N/A',
            description: record.description || 'N/A',
            aliases: record.aliases || [], // Assuming 'aliases' is an array
            images: record.images || [] // Assuming 'images' is an array
        };

        // Update the DOM with the person's information
        document.getElementById('personTitle').textContent = item.title;
        document.getElementById('personNationality').textContent = item.nationality;
        document.getElementById('personSex').textContent = item.sex;
        document.getElementById('personStatus').textContent = item.status;
        document.getElementById('personDescription').textContent = item.description;

        // Display the aliases if available
        const aliasesList = document.getElementById('personAliases');
        if (item.aliases.length > 0) {
            item.aliases.forEach(alias => {
                const listItem = document.createElement('li');
                listItem.textContent = alias;
                aliasesList.appendChild(listItem);
            });
        } else {
            aliasesList.innerHTML = '<li>No aliases available</li>';
        }

        // Display the images if available
        const imagesContainer = document.getElementById('personImages');
        if (item.images.length > 0) {
            item.images.forEach(image => {
                const imgElement = document.createElement('img');
                imgElement.src = image.original; // Assuming each image object has a 'large' property for the image URL
                imgElement.alt = `Image of ${item.title}`;
                imgElement.style.width = '200px'; // Set width to 200px or adjust as needed
                imgElement.style.margin = '10px'; // Add some margin for spacing
                imagesContainer.appendChild(imgElement);
            });
        } else {
            imagesContainer.innerHTML = '<p>No images available</p>';
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

// Call the getData function
getData();
