import {useRef} from "react";

export const PuzzleAssembler = (props) => {
    const {data} = props;
    console.log('Images received from GeneratePuzzle component: ');

    const pieces = [...data].map((piece) => ({
        image: piece,
        position: [Math.random() * 300, Math.random() * 300 + 300],
    }));

    console.log('Pieces')
    console.log(pieces);

    const selected = useRef();

    const handleMouseDown = (event, index) => {
        selected.current = {index, element: event.target};
        document.addEventListener("mousemove", handleMouseMove);
    };

    const handleMouseMove = (event) => {
        const {index, element} = selected.current;
        const positionX = event.pageX - element.offsetWidth / 2;
        const positionY = event.pageY - element.offsetHeight / 2;
        pieces[index].position = [positionX, positionY];
        element.style.transform = `translate3d(${positionX}px, ${positionY}px, 0)`;
    };

    const handleMouseUp = () => {
        const sortedPieces = sortPiecesByPosition(pieces);
        console.log(sortedPieces.map(p => p.name));
        endDrag();
    };

    const endDrag = () => {
        selected.current = null;
        document.removeEventListener("mousemove", handleMouseMove);
    };

    const sortPiecesByPosition = (pieces) => {
        return [...pieces].sort((a, b) => {
            const [ax, ay] = a.position;
            const [bx, by] = b.position;

            // Compare the y position first
            if (Math.abs(ay - by) > 5) {
                return ay - by;
            }

            // If y positions are within the range, compare the x position
            if (Math.abs(ax - bx) > 5) {
                return ax - bx;
            }

            // If both x and y positions are within the range, consider them equal
            return 0;
        });
    };

    return (
        <div>
            {pieces.map((piece, index) => (
                <div
                    key={index}
                    onMouseDown={(event) => handleMouseDown(event, index)}
                    onMouseUp={handleMouseUp}
                    style={{
                        backgroundImage: `url(${piece.image.src})`,
                        backgroundSize: "cover",
                        width: "64px",
                        height: "64px",
                        position: "absolute",
                        transform: `translate3d(${piece.position[0]}px, ${piece.position[1]}px, 0)`
                    }}
                >
                    {index}
                </div>
            ))}
        </div>
    );
}
export default PuzzleAssembler;
