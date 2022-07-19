import { HashMap } from "./../types/hash";
export function getPlayer(chance: boolean | string): string {
	if (typeof chance === "string" && chance !== "-1") return chance;

	if (typeof chance === "boolean" && chance) return "cross";

	return "circle";
}

export function checkWinner(board: string[]): HashMap {
	for (let i = 0; i < 9; i += 3) {
		let res = 0;

		let hash: HashMap = {};

		for (let j = i; j < i + 3; j++)
			if (board[j] && board[j] === board[i]) {
				hash[j] = true;
				res++;
			}
		if (res === 3) return hash;
	}

	for (let i = 0; i < 3; i++) {
		let res = 0;
		let hash: HashMap = {};

		for (let j = i; j < 9; j += 3)
			if (board[j] && board[i] === board[j]) {
				hash[j] = true;

				res++;
			}

		if (res === 3) return hash;
	}

	let hash: HashMap = {};

	if (board[0] === board[4] && board[8] === board[4] && board[4])
		hash[0] = hash[4] = hash[8] = true;

	if (board[2] === board[4] && board[6] === board[4] && board[4])
		hash[2] = hash[4] = hash[6] = true;

	return hash;
}

// function getWinning()
