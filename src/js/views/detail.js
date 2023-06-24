import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

export const Detail = () => {
    // Access the store from the app context
    const { store } = useContext(Context);

    // Get the detail page data from the store
    const detailPage = store.detailPage;

    // State variables to store additional details
    const [homeworldDetails, setHomeworldDetails] = useState(null);
    const [filmDetails, setFilmDetails] = useState([]);
    const [speciesDetails, setSpeciesDetails] = useState([]);
    const [starshipDetails, setStarshipDetails] = useState([]);
    const [vehicleDetails, setVehicleDetails] = useState([]);

    // Fetch additional details when the detailPage changes
    useEffect(() => {
        // Check if the detailPage is about a character
        if (detailPage.type === "Character") {
            // Get the character information
            const character = detailPage.info;

            // Fetch the details of the character's homeworld
            fetch(character.homeworld)
                .then((response) => response.json())
                .then((data) => setHomeworldDetails(data));

            // Fetch the details of the films the character appeared in
            Promise.all(
                character.films.map((film) =>
                    fetch(film).then((response) => response.json())
                )
            ).then((filmsData) => setFilmDetails(filmsData));

            // Fetch the details of the character's species
            Promise.all(
                character.species.map((species) =>
                    fetch(species).then((response) => response.json())
                )
            ).then((speciesData) => setSpeciesDetails(speciesData));

            // Fetch the details of the starships the character piloted
            Promise.all(
                character.starships.map((starship) =>
                    fetch(starship).then((response) => response.json())
                )
            ).then((starshipsData) => setStarshipDetails(starshipsData));

            // Fetch the details of the vehicles the character piloted
            Promise.all(
                character.vehicles.map((vehicle) =>
                    fetch(vehicle).then((response) => response.json())
                )
            ).then((vehiclesData) => setVehicleDetails(vehiclesData));
        }
    }, [detailPage]);

    // Variables to hold the page title, content, and mentioned attributes
    let pageTitle = "";
    let pageContent = "";
    let mentionedAttributes = [];

    // Check the type of the detail page
    if (detailPage.type === "Character") {
        // Get the character information
        const character = detailPage.info;

        // Set the page title to the character's name
        pageTitle = character.name;

        // Construct the page content with character details
        pageContent = (
            <div>
                <p>
                    {`In a galaxy far, far away, there was a person named ${character.name}. `}

                    {/* Check if gender is known */}
                    {character.gender === "unknown" || character.gender === "n/a" ? (
                        "Their gender is unknown or undefined. "
                    ) : (
                        `They identify as ${character.gender}. `
                    )}

                    {/* Check if eye color is known */}
                    {character.eye_color !== "unknown" && character.eye_color !== "n/a" && (
                        <span>{`With ${character.eye_color} eyes, `}</span>
                    )}

                    {/* Check if hair color is known */}
                    {character.hair_color !== "unknown" &&
                        character.hair_color !== "n/a" && (
                            <span>{`they have ${character.hair_color} hair. `}</span>
                        )}

                    {`Born in ${character.birth_year}, `}

                    {/* Check if height is known */}
                    {character.height !== "unknown" && character.height !== "n/a" && (
                        <span>{`they stand at ${character.height} cm tall. `}</span>
                    )}

                    {/* Check if mass is known */}
                    {character.mass !== "unknown" && character.mass !== "n/a" && (
                        <span>{`Weighing ${character.mass} kg, `}</span>
                    )}

                    {/* Check if skin color is known */}
                    {character.skin_color !== "unknown" &&
                        character.skin_color !== "n/a" && (
                            <span>{`their skin has a ${character.skin_color} tone. `}</span>
                        )}

                    {/* Display the homeworld details if available */}
                    {homeworldDetails && homeworldDetails.name && (
                        <span>
                            {`They hail from the planet `}
                            <a href={homeworldDetails.url}>{homeworldDetails.name}</a>.
                            {` `}
                        </span>
                    )}

                    {/* Display the films the character appeared in */}
                    {filmDetails.length > 0 && (
                        <span>
                            {`They have appeared in the following films: `}
                            {filmDetails.map((film, index) => (
                                <span key={index}>
                                    <a href={film.url}>{film.title}</a>
                                    {index !== filmDetails.length - 1 && ", "}
                                </span>
                            ))}
                            {`. `}
                        </span>
                    )}

                    {/* Display the species the character belongs to */}
                    {speciesDetails.length > 0 && (
                        <span>
                            {`Belonging to the following species: `}
                            {speciesDetails.map((species, index) => (
                                <span key={index}>
                                    <a href={species.url}>{species.name}</a>
                                    {index !== speciesDetails.length - 1 && ", "}
                                </span>
                            ))}
                            {`. `}
                        </span>
                    )}

                    {/* Display the starships the character piloted */}
                    {starshipDetails.length > 0 && (
                        <span>
                            {`They have piloted the following starships: `}
                            {starshipDetails.map((starship, index) => (
                                <span key={index}>
                                    <a href={starship.url}>{starship.name}</a>
                                    {index !== starshipDetails.length - 1 && ", "}
                                </span>
                            ))}
                            {`. `}
                        </span>
                    )}

                    {/* Display the vehicles the character piloted */}
                    {vehicleDetails.length > 0 && (
                        <span>
                            {`They have piloted the following vehicles: `}
                            {vehicleDetails.map((vehicle, index) => (
                                <span key={index}>
                                    <a href={vehicle.url}>{vehicle.name}</a>
                                    {index !== vehicleDetails.length - 1 && ", "}
                                </span>
                            ))}
                            {`. `}
                        </span>
                    )}

                    {`For more information, you can visit their resource URL: `}
                    <a href={character.url}>{character.url}</a>.
                </p>
            </div>
        );

        // Filter the mentioned attributes (excluding name, url, unknown, and n/a)
        mentionedAttributes = Object.keys(character).filter(
            (attribute) =>
                attribute !== "name" &&
                attribute !== "url" &&
                character[attribute] !== "unknown" &&
                character[attribute] !== "n/a"
        );
    } else if (detailPage.type === "Planet") {
        // Get the planet information
        const planet = detailPage.info;

        // Set the page title to the planet's name
        pageTitle = planet.name;

        // Construct the page content with planet details
        pageContent = (
            <div>
                <p>
                    {`In a galaxy far, far away, there was a planet called ${planet.name}. `}
                    {`With a population of ${planet.population}, `}
                    {`it features ${planet.terrain} terrain. `}
                    {`For more information, you can visit its resource URL: `}
                    <a href={planet.url}>{planet.url}</a>.
                </p>
            </div>
        );

        // Filter the mentioned attributes (excluding name, url, unknown, and n/a)
        mentionedAttributes = Object.keys(planet).filter(
            (attribute) =>
                attribute !== "name" &&
                attribute !== "url" &&
                planet[attribute] !== "unknown" &&
                planet[attribute] !== "n/a"
        );
    } else if (detailPage.type === "none") {
        // Redirect to the home page if type is "none"
        window.location.href = "/";
    }

    return (
        <div style={{ textAlign: "center" }}>
            <h1 style={{ fontWeight: "bold" }}>{pageTitle}</h1>
            {pageContent}
            {mentionedAttributes.length > 0 && (
                <p>
                    Attributes mentioned:{" "}
                    <span style={{ color: "red" }}>
                        {mentionedAttributes.join(", ")}
                    </span>
                </p>
            )}
        </div>
    );
};
