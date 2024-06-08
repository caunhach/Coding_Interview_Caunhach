type Board = {
	ladders: [number, number][]
	snakes: [number, number][]
}

function quickestPath(board: Board): number[] {
	const ladders = new Map<number, number>()
	const snakes = new Map<number, number>()

	board.ladders.forEach(([start, end]) => ladders.set(start, end));
    board.snakes.forEach(([start, end]) => snakes.set(start, end));

	function bfs(): number[] {
		const queue: [number, number[]][] = [[1, []]]
		const visitPos: boolean[] = Array(100).fill(false)
		visitPos[0] = true

		while (queue.length > 0) {
			const [currentPoint, path] = queue.shift()!
			
			if (currentPoint == 100)
				return path
			for (let i = 1; i <= 6; i++) {
				let newPos = currentPoint + i
				if (newPos > 100)
					continue;
				if (ladders.has(newPos))
                    newPos = ladders.get(newPos)!;
				if (snakes.has(newPos))
                    newPos = snakes.get(newPos)!;
				if (!visitPos[newPos - 1]) {
					visitPos[newPos - 1] = true
					queue.push([newPos, [...path, i]])
				}
			}
		}
		return []
	}
	return bfs()
}

// const board: Board = {
//     ladders: [[3, 39], [14, 35], [31, 70], [44, 65], [47, 86], [63, 83], [71, 93]],
//     snakes: [[21, 4], [30, 8], [55, 38], [79, 42], [87, 54], [91, 48], [96, 66]]
// };

// const result = quickestPath(board);
// console.log("Sequence of dice rolls:", result);