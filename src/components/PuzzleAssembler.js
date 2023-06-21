import {useMemo, useRef, useState} from "react";
import React from "react";
import VerifyPuzzles from "./VerifyPuzzles";

export const PuzzleAssembler = (props) => {
    const {data} = props;
    const [assembledPuzzles, setAssembledPuzzles] = useState([]);

    const pieces = useMemo(() => {
        return [...data].map((piece, index) => ({
            image: piece,
            name: index,
            position: [Math.random() * 300, Math.random() * 300 + 300],
        }));
    }, [data]);

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
        console.log(sortedPieces.map(sortedPiece => sortedPiece.index))
        setAssembledPuzzles(sortedPieces);
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
                        width: "100px",
                        height: "100px",
                        position: "absolute",
                        left: `${piece.position[0]}px`,
                        top: `${piece.position[1]}px`
                    }}
                >
                    {index}
                </div>
            ))}
            <VerifyPuzzles data={assembledPuzzles}/>
        </div>
    );
};
export default PuzzleAssembler;
