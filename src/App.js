import { useEffect, useState } from "react";
import "./styles.css";
import { JigsawPuzzle } from "react-jigsaw-puzzle/lib";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
import { splitImage } from "./api/services";

const party = require("party-js");

export default function App() {
  const [img, setImg] = useState("");
  const [puzzleImg, setPuzzleImg] = useState("");
  const [solved, setSolved] = useState(false);
  const [next, setNext] = useState(0);

  const onSolved = () => {
    setSolved(true);
  };
  useEffect(() => {
    if (solved)
      party.confetti(document.getElementsByClassName("congo")[0], {
        count: party.variation.range(100, 100)
      });
  }, [solved]);

  //function generatePuzzle

  const generatePuzzle = async () => {
    try {
      const puzzlePieces = await splitImage(img); // Call the splitImage function with the image URL
      console.log(puzzlePieces); // Handle the response from the backend as needed

      // Assuming puzzlePieces is a list of strings
      if (Array.isArray(puzzlePieces) && puzzlePieces.length > 0) {
        // Handle the puzzle pieces, e.g., store them in state, display them, etc.
        // Example: setPieces(puzzlePieces);
      } else {
        console.log("Invalid response from the backend"); // Handle the case when the response is not as expected
      }
    } catch (error) {
      console.log(error); // Handle any error that occurred during the API call
    }
  };

  //end of generatePuzzle

  if (next === 0) {
    return (
      <div className="App">
        <h1>Puzzles Game</h1>
        {solved && <h1 className="congo">Congrats</h1>}
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
            style={{ padding: "1rem", color: "#fff", backgroundColor: "#000" }}
            // onClick={() => setPuzzleImg(img)} //old version to generate puzzle
            onClick={generatePuzzle} // Call the generatePuzzle function on button click

          >
            Generate Puzzle
          </button>
          <button
            style={{ padding: "1rem", color: "#fff", backgroundColor: "#000" }}
            onClick={() => setPuzzleImg(img)}

          >
            Verify Puzzle
          </button>
        </div>
        <div>
          <JigsawPuzzle
            imageSrc={puzzleImg}
            rows={2}
            columns={3}
            onSolved={onSolved}
          />
        </div>
      </div>
    );
  }
}
