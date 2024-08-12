# Star Wars Character App

A React application that displays a list of Star Wars characters using the SWAPI (Star Wars API). The app includes features such as search, filter, and detailed character information displayed in a modal.

## Features

- Display a list of Star Wars characters.
- Show a random image for each character.
- Color code character cards based on their species.
- Display detailed information about a character in a modal.
- Search characters by name.
- Filter characters by homeworld, species, or films.
- Handle loading and error states.

### Installation
**Clone the repository:**

```bash
git clone https://github.com/okusjid/star-wars.git
cd star-wars
```

## Folder Structure

- **components/**: Contains reusable UI components such as `CharacterCard`, `CharacterModal`, `Loader`, and `SearchFilter`.
- **services/**: Contains API service functions for fetching data from the SWAPI.
- **hooks/**: Contains custom hooks like `useFetch` for data fetching.
- **utils/**: Contains utility functions like `formatDate` for date formatting.
- **App.jsx**: The main app component.
- **App.css**: The main CSS file for styling.

## Acknowledgments

- **[SWAPI](https://swapi.dev/)** for providing the Star Wars API.
- **[StarWars Visual Guide](https://starwars-visualguide.com/assets/img/characters)** for providing character images.
- **[Vite](https://vitejs.dev/)** for the development environment.



