import "./styles.css";
import "./api/services";
import GeneratePuzzle from "./components/GeneratePuzzle";

export default function App() {
    return (
        <div className="App">
            <GeneratePuzzle/>
        </div>
    );
}
