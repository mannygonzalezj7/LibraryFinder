// DISCLAIMER: I had ChatGPT write a script to pull data from the libraries webpage and export it into libraryData.json. I do not know how to do this (although I would love to learn), so to make the frontend coding easier I had to use my resources -Manny
var count = 0;
const activeContainer = document.getElementById("card-container-active");
const mainCarousel = document.getElementById("main-carousel");
const mainLibraries = document.getElementById("main-libraries");
const containers = [];

fetch("libraryData.json")
  .then((response) => response.json()) // Convert the response to JSON
  .then((data) => {
    // Access your JSON data here
    console.log(data);

    /////////////////// Manny wrote the rest of the callback code /////////////////

    // Create card containers for the inactive methods
    if (mainCarousel) {
      for (var i = 0; i < data.length / 4; i++) {
        const inactive = `card-container-inactive-${[i]}`;
        containers.push(inactive);
      }

      // ForEach loop to write to the carousel
      data.forEach((element) => {
        // Card template with name
        const sanitizedID = element.name
          .replace(/\s+/g, "-")
          .replace(/'/g, "")
          .replace(/([.*+?^@=!:${}()|\[\]\/\\])/g, "\\$1")
          .replace(/@/g, "\\");

        const cardHTML = `<!-- ${element.name} -->
      <div class="col-12 col-md-4 col-lg-2">
        <div class="card">
            <img src="https://via.placeholder.com/150" class="card-img-top" alt="${element.name} Library Image">
            <div class="card-body">
                <h5 class="card-title">${element.name}</h5>
                <a href="location.html#${sanitizedID}Details" class="btn btn-danger">Explore</a>
          </div>
        </div>
      </div>
  
          `;
        // End of carousel slide template
        const cardTail = `                </div>
            </div>`;

        // Check if the count is greater than 4 to make an inactive slide
        if (count <= 3) {
          console.log(count);
          activeContainer.innerHTML += cardHTML;
        } else {
          if (count % 4 == 0) {
            // Start of carousel slide template with specific carousel container
            const cardHead = `<div class="carousel-item">
      <div class="row text-center g-4 justify-content-center" id="${
        containers[count / 4]
      }">
      
      `;
            // Add head to the beginning of the four cards
            mainCarousel.innerHTML += cardHead;
          }
          // Add card to container
          document.getElementById(
            `${containers[Math.floor(count / 4)]}`
          ).innerHTML += cardHTML;

          // Add tail to the end of the four cards
          if (count % 4 == 0) {
            mainCarousel.innerHTML += cardTail;
          }
        }

        count += 1;
      });
    } else if (mainLibraries) {
      // ForEach loop to write to the locations
      data.forEach((element) => {
        const sanitizedID = element.name
          .replace(/\s+/g, "-")
          .replace(/'/g, "")
          .replace(/([.*+?@^=!:${}()|\[\]\/\\])/g, "\\$1")
          .replace(/@/g, "\\");

        const collapsable = `<!-- ${element.name} library-->
      <div class="list-group-item d-flex justify-content-between align-items-center">
      <div>
          <strong>${element.name}</strong><br>
          ${element.hours.today}
      </div>
      <div>
          <a href="#" class="btn btn-link">Books</a>
          <a href="#" class="btn btn-link">Events</a>
          <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="collapse"
              data-bs-target="#${sanitizedID}Details" aria-expanded="false" aria-controls="${sanitizedID}Details"></button>
      </div>
  </div>
  <div class="collapse" id="${sanitizedID}Details">
      <div class="card card-body">
          Additional details about ${element.name}:

          
      </div>
  </div>`;

        mainLibraries.innerHTML += collapsable;
      });
    }
  })
  .catch((error) => console.error("Error loading the JSON file:", error));

document.addEventListener("DOMContentLoaded", function () {
  // If there's a hash in the URL (e.g., #AMP-Library-details)
  if (window.location.hash) {
    const hash = window.location.hash;

    const targetElement = document.querySelector(hash);

    if (targetElement) {
      const dropdownButton = targetElement.querySelector(".dropdown-toggle");
      if (dropdownButton) {
        $(dropdownButton).collapse("show");
      }
    }
  }
});
