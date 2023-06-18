import { useEffect, useState } from "react";
import "./styles.css";
import { JigsawPuzzle } from "react-jigsaw-puzzle/lib";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";

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

  if (next === 0) {
    return (
      <div className="App">
        <h1>Puzzles Game</h1>
        <button onClick={() => setNext(1)}>Next Game (Number puzzle)</button>
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
            onClick={() => setPuzzleImg(img)}
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
