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
        <div class="card" id="card">
            <div class="image-container">
              <img src="${element.image}" class="card-img-top" alt="${element.name} Library Image">
            </div>
            <div class="card-body">
                <h5 class="card-title">${element.name}</h5>
                <a href="location.html#${sanitizedID}Details" class="btn btn-danger" id="collapseButton">Explore</a>
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

      document
        .getElementById("collapseButton")
        .addEventListener("click", function () {
          // Toggle the aria-expanded attribute based on the current state
          const isExpanded = this.getAttribute("aria-expanded") === "true";
          // Save the state to localStorage (true for expanded, false for collapsed)
          localStorage.setItem("collapseState", !isExpanded);
          // Update the aria-expanded attribute
          this.setAttribute("aria-expanded", !isExpanded);
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
          <a href="./book.html" class="btn btn-link">Books</a>
          <a href="./event.html" class="btn btn-link">Events</a>
          <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="collapse"
              data-bs-target="#${sanitizedID}Details" aria-expanded="false" aria-controls="${sanitizedID}Details"></button>
          
              <script>
              document.getElementById('collapseButton').addEventListener('click', function() {
                // Toggle the aria-expanded attribute based on the current state
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                // Save the state to localStorage (true for expanded, false for collapsed)
                localStorage.setItem('collapseState', !isExpanded);
                // Update the aria-expanded attribute
                this.setAttribute('aria-expanded', !isExpanded);
              });
            </script>
      </div>
  </div>
  <div class="collapse" id="${sanitizedID}Details">
    <div class="card card-body">
        <div class="row">
            <!-- Left Column: Text Details -->
            <div class="col-md-6">
                <strong>Additional details about ${element.name}:</strong>
                <br>
                Location: ${element.location}<br>
                Contact: ${element.contact.phone} or ${
          element.contact.email
        }<br>
                <br>
                Services: ${element.services.join(", ")}<br>
                <br>
                Specialties: ${element.specialties.join(", ")}<br>
            </div>
            <!-- Right Column: Image -->
            <div class="col-md-6 text-center">
                <div class="image-container">
                    <img src="${
                      element.image
                    }" class="card-img-top img-fluid" alt="${
          element.name
        } Library Image">
                </div>
            </div>
        </div>
    </div>
</div>`;

        mainLibraries.innerHTML += collapsable;
      });

      // Retrieve the collapse state from localStorage
      const collapseState = localStorage.getItem("collapseState");
      const collapseButton = document.getElementById("collapseButton");
      const collapseElement = document.getElementById("${sanitizedID}Details");

      if (collapseState === "true") {
        // If the state is true (expanded), expand the collapse
        collapseElement.classList.add("show");
        collapseButton.setAttribute("aria-expanded", "true");
      }

      // Optionally, clear the state from localStorage if you want to reset the state later
      // localStorage.removeItem('collapseState');
    }
  })
  .catch((error) => console.error("Error loading the JSON file:", error));
