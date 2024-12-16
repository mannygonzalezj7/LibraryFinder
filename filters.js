let filters = [
  document.getElementById("equipmentCheck"),
  document.getElementById("lockersCheck"),
  document.getElementById("vendingCheck"),
  document.getElementById("printingColorCheck"),
  document.getElementById("studyRoomsCheck"),
  document.getElementById("silentSpacesCheck"),
];

fetch("libraryData.json")
  .then((response) => response.json())
  .then((data) => {
    // Function to check the filters and show/hide cards
    function checker() {
      console.log(`checked has changed!`);
      data.forEach((element) => {
        const sanitizedID = element.name
          .replace(/\s+/g, "-")
          .replace(/'/g, "")
          .replace(/([.*+?@^=!:${}()|\[\]\/\\])/g, "\\$1")
          .replace(/@/g, "\\");

        let elementCard = document.getElementById(sanitizedID);
        if (!elementCard) return; // Skip if the element doesn't exist

        // Reset the display before applying new filters
        elementCard.classList.remove("hidden"); // Ensure the card is visible by default

        let shouldHide = false; // Default flag to hide the card

        // Check each filter and whether the library offers that service
        if (
          filters[0].checked &&
          !element.services.includes("AV equipment for check out")
        ) {
          shouldHide = true;
        }
        if (filters[1].checked && !element.services.includes("Lockers")) {
          shouldHide = true;
        }
        if (filters[2].checked && !element.services.includes("Vending area")) {
          shouldHide = true;
        }
        if (
          filters[3].checked &&
          !element.services.includes("Color laser printer")
        ) {
          shouldHide = true;
        }
        if (
          filters[4].checked &&
          !element.services.includes("Reservable study rooms")
        ) {
          shouldHide = true;
        }
        if (
          filters[5].checked &&
          !element.services.includes("Silent study spaces")
        ) {
          shouldHide = true;
        }

        // Apply the hiding logic based on filter status
        if (shouldHide) {
          elementCard.classList.add("hidden"); // Hide the card
        }
      });
    }

    // Set event listeners for the filter checkboxes to run the checker when any filter changes
    filters.forEach((filter) => {
      filter.addEventListener("change", checker); // Call checker when a checkbox is changed
    });

    // Call the checker once to apply the filters initially
    checker();
  })
  .catch((error) => console.error("Error loading the JSON file:", error));
