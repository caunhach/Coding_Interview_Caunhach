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
				else if (snakes.has(newPos))
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

// {
// 	const testBoard: Board = {
//     	ladders: [[1, 38], [14, 44], [27, 57], [40, 67], [50, 85], [65, 97]],
//     	snakes: [[24, 7], [33, 19], [48, 30], [58, 42], [83, 63], [99, 77]]
// 	};
// 	console.log(quickestPath(testBoard));
// }

// {
// 	const testBoard: Board = {
// 		ladders: [ [3, 39], [14, 35], [31, 70], [44, 65], [47, 86], [63, 83], [71, 93] ],
// 		snakes: [ [21, 4], [30, 8], [55, 38], [79, 42], [87, 54], [91, 48], [96, 66] ]
// 	}
// 	console.log(quickestPath(testBoard));
// }

// {
// 	const testBoard: Board = {
// 		ladders: [[2, 38], [16, 29], [22, 58], [28, 79], [46, 96]],
//         snakes: [[13, 5], [34, 20], [49, 32], [67, 51], [87, 64], [93, 69]]
// 	}
// 	console.log(quickestPath(testBoard));
// }

// {
// 	const testBoard: Board = {
// 		ladders: [[6, 20], [13, 99]],
//         snakes: [[7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [21, 7], [22, 8], [23, 9], [24, 10], [25, 11], [26, 12]]
// 	}
// 	console.log(quickestPath(testBoard));
// }