import React from "react";
import "./index.css";
import { HashMap } from "../../types/hash";
import { getPlayer } from "../../utils/helper";

type BoardProps = {
	board: string[];
	handleClick: (index: number) => void;
	hash: HashMap;
	chance: boolean;
};

function Board({ board, handleClick, hash, chance }: BoardProps) {
	return (
		<div
			className={
				"ap11grid animate__animated animate__backInDown " + getPlayer(chance)
			}
		>
			{board.map((d, index) => (
				<div
					key={index}
					className={"ap11cell " + getPlayer(d) + (hash[index] ? " blink" : "")}
					onClick={() => handleClick(index)}
				/>
			))}
		</div>
	);
}

export default Board;
