import { useState } from "react";
import "./App.css";
import { HashMap } from "./types/hash";
import { checkWinner, getPlayer } from "./utils/helper";
import Board from "./views/Board";

const moveSound = require("./static/move.mp3");
const finishSound = require("./static/finish.mp3");
const openSound = require("./static/open.mp3");

const moveTrack = new Audio(moveSound);
const finishTrack = new Audio(finishSound);
const openTrack = new Audio(openSound);

function App() {
	const intialBoard: string[] = ["", "", "", "", "", "", "", "", ""];
	const [board, setBoard] = useState(intialBoard);
	const [chance, setChance] = useState(true);
	const [hash, setHash] = useState<HashMap>({});
	const [countCross, setCountCross] = useState(30);
	const [countCircle, setCountCircle] = useState(30);
	const [crossTimer, setCrossTimer] = useState<NodeJS.Timer>();
	const [cirlceTimer, setCircleTimer] = useState<NodeJS.Timer>();

	const handleClick = async (index: number) => {
		// console.log(board, Object.keys(hash).length, countCircle, countCircle);

		if (
			board[index] != "" ||
			Object.keys(hash).length == 3 ||
			countCircle == 0 ||
			countCross == 0
		)
			return;

		moveTrack.play();

		if (chance) board[index] = "cross";
		else board[index] = "circle";

		setBoard(board);

		let res = checkWinner(board);

		if (Object.keys(res).length == 3) {
			finishTrack.play();

			clearInterval(crossTimer);
			clearInterval(cirlceTimer);
		} else {
			if (chance) {
				clearInterval(crossTimer);

				let id: NodeJS.Timer = setInterval(
					() => setCountCircle((c) => Math.max(0, c - 1)),
					1000
				);

				setCircleTimer(id);
			} else {
				clearInterval(cirlceTimer);

				let id: NodeJS.Timer = setInterval(
					() => setCountCross((c) => Math.max(0, c - 1)),
					1000
				);

				setCrossTimer(id);
			}
		}

		setHash(res);

		setChance(!chance);
	};

	// console.log(board);

	const handleRestart = () => {
		openTrack.play();
		clearInterval(cirlceTimer);
		clearInterval(crossTimer);
		setCountCircle(() => 30);
		setCountCross(() => 30);
		setHash({});
		setChance(true);
		setBoard(intialBoard);

		// console.log(intialBoard == board);
	};

	return (
		<div className="ap11ctn">
			<div className="timer animate__animated animate__backInLeft ">
				{countCross}
			</div>
			<div className="ap11sc">
				<h1 className="ap11hd animate__animated animate__bounceIn">
					Tic Tac Toe
				</h1>
				<Board
					board={board}
					handleClick={handleClick}
					hash={hash}
					chance={chance}
				/>
				<img
					src="./restart.svg"
					className="ap11im  animate__animated animate__rotateIn"
					alt="restart image"
					onClick={handleRestart}
				/>
			</div>

			<div className="timer animate__animated animate__backInRight ">
				{countCircle}
			</div>
		</div>
	);
}

export default App;
