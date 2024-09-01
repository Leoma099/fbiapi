let currentPage = 1;
const itemsPerPage = 20; // Assuming each page has 20 items

async function getData(page = 1) {
    try {
        const response = await fetch(`https://api.fbi.gov/wanted/v1/list?page=${page}&pageSize=${itemsPerPage}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const records = await response.json();
        console.log(records); // Inspect the structure here

        let items = '';

        records.items.forEach(function (item) {
            items += `<tr>
                    <td>${item.title}</td>
                    <td>${item.nationality}</td>
                    <td>${item.sex}</td>
                    <td>${item.status}</td>
                    <td>${item.description}</td>
                    <td>
                        <a href="read.html?uid=${item.uid}">read</a>
                        <a href="update.html?uid=${item.uid}">update</a>
                        <a href="delete.html?uid=${item.uid}">delete</a>
                    </td>
                </tr>`;
        });

        document.getElementById('dataListItems').innerHTML = items;

        // Update the page number display
        document.getElementById('currentPage').textContent = `Page ${currentPage} of ${Math.ceil(997 / itemsPerPage)}`;
    } catch (error) {
        console.error("Error:", error);
    }
}

// Function to handle the next page
function nextPage() {
    if (currentPage < Math.ceil(997 / itemsPerPage)) {
        currentPage++;
        getData(currentPage);
    }
}

// Function to handle the previous page
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        getData(currentPage);
    }
}

// Call the getData function for the initial load
getData(currentPage);
