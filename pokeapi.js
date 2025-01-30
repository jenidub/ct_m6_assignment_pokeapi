// Global Variables
const searchButton = document.querySelector("#search-button")
const searchInput = document.querySelector("#search-input")
const resultsElement = document.querySelector("#api-results")

const cardHeader = document.querySelector("#card-header")
const cardPicContainer = document.querySelector("#char-image")
const cardTitle = document.querySelector("#char-card-title")
const profileHeader = document.querySelector("#char-card-title")
const charTypeElement = document.querySelector("#char-type")
const charAbilityElement = document.querySelector("#char-ability")

// Instructions:
// Use the PokeAPI to fetch Pokémon data asynchronously.
async function fetchPokemonData (searchInput) {
    try{
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${searchInput}`
        const response = await fetch(apiUrl)
        const responseJSON = await response.json()
        return responseJSON
    } 
    // 3. Basic Error Handling:
    //      If the Pokémon is not found, display a simple error message.
    catch(error) {
        console.error(`Error with the API request. Please try again.`)
    }
}

// Create an input box where users can type the name or ID of a Pokémon.
// Add a button that triggers the search when clicked.
searchButton.addEventListener("click", async (e) => {
    e.preventDefault()
    const userInput = searchInput.value

    try {
        // When the search is triggered, make an API request to retrieve the Pokémon's information.
        const pokemonData = await fetchPokemonData(userInput)

        // 2. Display Data: Display the Pokémon's name and image on the page after fetching the data.
        //      Update the DOM dynamically based on the API response.

        // Add the Character Name to the Card Title and Profile Header
        const charName = pokemonData.species.name
        cardHeader.textContent = `${charName.toUpperCase()}`
        profileHeader.textContent = `${charName} Character Profile`

        // Add the Character Front Profile View to the Card Img Container
        const charPicUrl = pokemonData.sprites.front_default
        cardPicContainer.setAttribute("src", `${charPicUrl}`)

        // Bonus (Optional): Display the Pokémon's type (e.g., Fire, Water) along with 
        // its name and image.
        
        // Add the Character Primary Type to the Card
        let charType = pokemonData.types[0].type.name
        charTypeElement.textContent = `Character Type: ${charType}`

        //Add the Character Ability to the Card
        let charTopAbility = pokemonData.abilities[0].ability.name
        charAbilityElement.textContent = `Character's Top Ability: ${charTopAbility}`
    }
    
    //Display an error message if the API request generates an error
    catch(error) {
        cardHeader.textContent = ``
        cardPicContainer.removeAttribute("src")
        profileHeader.textContent = ``
        cardTitle.textContent = `Error in the API Request - Please try again`
        charTypeElement.textContent = ``
        charAbilityElement.textContent = ``
        console.error(`Error in the API Request - Please try again`)
    }
})
