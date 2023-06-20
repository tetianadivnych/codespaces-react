import {useRef} from "react";

export const PuzzleAssembler = (props) => {
    const {data} = props;
    const pieces = [...data].map((piece, index) => ({
        image: piece,
        name: index,
        position: [Math.random() * 300, Math.random() * 300 + 300],
    }));

    const selected = useRef();

    const handleMouseDown = (event, index) => {
        const {offsetX, offsetY} = event.nativeEvent;
        selected.current = {index, element: event.target, offsetX, offsetY};
        document.addEventListener("mousemove", handleMouseMove);
    };

    const handleMouseMove = (event) => {
        const {index, element, offsetX, offsetY} = selected.current;
        const positionX = event.pageX - offsetX;
        const positionY = event.pageY - offsetY;
        pieces[index].position = [positionX, positionY];
        element.style.left = `${positionX}px`;
        element.style.top = `${positionY}px`;
    };

    const handleMouseUp = () => {
        const sortedPieces = sortPiecesByPosition(pieces);
        console.log(sortedPieces);
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
                        left: `${piece.position[0]}px`,
                        top: `${piece.position[1]}px`
                    }}
                >
                    {index}
                </div>
            ))}
        </div>
    );
}
export default PuzzleAssembler;
