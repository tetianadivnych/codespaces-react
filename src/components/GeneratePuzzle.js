import React, {useState} from 'react';
import "../api/services";
import PuzzleAssembler from "./PuzzleAssembler";
import {splitImage} from "../api/services";


const GeneratePuzzle = () => {

    const [puzzleImages, setPuzzleImages] = useState([]);
    let imageUrl;
    //function generatePuzzle

    const generatePuzzle = async () => {
        try {
           const base64Images = await splitImage(imageUrl); // Call the splitImage function with the image URL

            // Assuming puzzlePieces is a list of strings
            if (Array.isArray(base64Images) && base64Images.length > 0) {
                // Loop through each puzzle piece and convert to images
                const images = base64Images.map(base64Image => {
                    const image = new Image();
                    image.src = `data:image/jpeg;base64,${base64Image}`;
                    return image;
                });
                setPuzzleImages(images);
            } else {
                console.log("Invalid response from the backend"); // Handle the case when the response is not as expected
            }
        } catch (error) {
            console.log(error); // Handle any error that occurred during the API call
        }
    };

    //end of generatePuzzle

    function setImg(value) {
        imageUrl = value;
    }

    return (
        <div>
            <h1>Puzzles Game</h1>
            <div>
                <input
                    placeholder="Image Url"
                    style={{
                        margin: "1rem",
                        padding: "1rem"
                    }}
                    onChange={(url) => setImg(url.target.value)}
                />
                <button
                    style={{padding: "1rem", color: "#fff", backgroundColor: "#000"}}
                    onClick={generatePuzzle}
                >
                    Generate Puzzle
                </button>
            </div>
            <div>
                <PuzzleAssembler data={puzzleImages}/>
            </div>
        </div>

    );
};

export default GeneratePuzzle;