const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

// Fetch initial list of meals
async function fetchRandomRecipes() {
    try {
        const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.meals || [];
    } catch (error) {
        console.error("Error fetching random recipes", error);
        return [];
    }
}

// Fetch meals based on search query
async function fetchRecipesByQuery(query) {
    try {
        const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.meals || [];
    } catch (error) {
        console.error("Error fetching recipes by query", error);
        return [];
    }
}

// Display meals on the page
function displayRecipes(meals) {
    blogContainer.innerHTML = "";

    if (meals.length === 0) {
        blogContainer.innerHTML = "<p>No recipes found.</p>";
        return;
    }

    meals.forEach((meal) => {
        const card = document.createElement("div");
        card.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = meal.strMealThumb;
        img.alt = meal.strMeal;

        const title = document.createElement("h2");
        const truncatedTitle = meal.strMeal.length > 30 ? meal.strMeal.slice(0, 30) + "..." : meal.strMeal;
        title.textContent = truncatedTitle;

        const description = document.createElement("p");
        const truncatedInstructions = meal.strInstructions
            ? meal.strInstructions.slice(0, 100) + "..."
            : "No description available.";
        description.textContent = truncatedInstructions;

        // View Recipe Button
        const viewBtn = document.createElement("button");
        viewBtn.classList.add("view-recipe-btn");
        viewBtn.textContent = "View Recipe";

        viewBtn.addEventListener("click", () => {
            showRecipePopup(meal);
        });

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(viewBtn);

        blogContainer.appendChild(card);
    });
}

// Show popup recipe card
function showRecipePopup(meal) {
    const overlay = document.createElement("div");
    overlay.classList.add("recipe-popup-overlay");

    const popup = document.createElement("div");
    popup.classList.add("recipe-popup");

    const closeBtn = document.createElement("button");
    closeBtn.classList.add("close-btn");
    closeBtn.innerHTML = "&times;";
    closeBtn.addEventListener("click", () => {
        overlay.remove();
        window.location.href = "index.html"; // Redirect to home
    });

    const title = document.createElement("h2");
    title.textContent = meal.strMeal;

    const img = document.createElement("img");
    img.src = meal.strMealThumb;
    img.alt = meal.strMeal;
    img.style.width = "100%";
    img.style.borderRadius = "10px";
    img.style.marginBottom = "1rem";

    const instructions = document.createElement("p");
    instructions.textContent = meal.strInstructions;

    popup.appendChild(closeBtn);
    popup.appendChild(title);
    popup.appendChild(img);
    popup.appendChild(instructions);

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // Optional: Close when clicking outside popup
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.remove();
            window.location.href = "index.html";
        }
    });
}

// Handle search button click
searchBtn.addEventListener("click", async () => {
    const query = searchField.value.trim();
    if (query !== "") {
        try {
            const meals = await fetchRecipesByQuery(query);
            displayRecipes(meals);
        } catch (error) {
            console.error("Error searching for recipes", error);
        }
    }
});

// Optional: handle Enter key
searchField.addEventListener("keyup", async (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});

// Initial load
(async () => {
    try {
        const meals = await fetchRandomRecipes();
        displayRecipes(meals);
    } catch (error) {
        console.error("Error loading initial recipes", error);
    }
})();
