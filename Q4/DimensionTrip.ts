function MinDisToEndStation(start: number, stations: number[], end: number, start_station: number): [number, number] {
	let del = 1
	let normalDistance = Math.abs(start - end)
	if (start_station == -1)
		return [normalDistance, start_station]
	let firstDistance = Math.abs(stations[start_station] - start)
	let stationDistance = firstDistance + Math.abs(stations[start_station] - end)

	if (start > end)
		del = -1
	while (start_station + del >= 0 && start_station + del <= stations.length - 1) {
		let minDistance = firstDistance + Math.abs(stations[start_station + del] - end)
		if (minDistance < stationDistance)
			stationDistance = minDistance
		else
			break
		start_station += del
	}
	return [Math.min(normalDistance, stationDistance), start_station]
}

function minEnergy(start: number, shops: number[], stations: number[], target: number): number {
	shops.sort((a, b) => a - b);
	stations.sort((a, b) => a -b);

	const queue: number[] = []
	let start_station = -1;
	let minDistance = Infinity;
	let energy = 0

	for (const shop of shops)
		queue.push(shop)
	queue.push(target)
    for (let i = 0; i < stations.length; i++) {
        const distance = Math.abs(start - stations[i]);

        if (distance < minDistance) {
            minDistance = distance;
            start_station = i;
        }
    }
	while (queue.length > 0) {
		const end = queue.shift()!
		const [addition_energy, new_station] = MinDisToEndStation(start, stations, end, start_station)
		energy += addition_energy
		start = end
		start_station = new_station
	}
	return energy;
}

// console.log("Test case 1: no shops no buses -> output : 10")
// console.log(minEnergy(0, [], [], 10));
// console.log("Test case 2: no shops -> output : 4")
// console.log(minEnergy(0, [], [2, 4, 6], 8));
// console.log("Test case 3: no buses -> output : 8")
// console.log(minEnergy(0, [2, 4, 6], [], 8));
// console.log("Test case 4: buses and shops between start and end -> output : 8")
// console.log(minEnergy(0, [4, 9], [3, 6, 8], 11))
// console.log("Test case 5: buses and shops between start and end & start > end -> output : 8")
// console.log(minEnergy(7, [4, 9], [3, 6, 8], 0))
// console.log("Test case 6: start surrounded by buses and shops -> output : 6")
// console.log(minEnergy(7, [4, 9], [3, 6, 8], 11))
// console.log("Test case 7: end surrounded by buses and shops -> output : 8")
// console.log(minEnergy(0, [5, 10], [3, 6, 9], 4));
// console.log("Test case 8: start is a shop -> output : 6")
// console.log(minEnergy(0, [0, 2, 4], [1, 3], 6));
// console.log("Test case 9: all shops and buses are before start point -> output : 8")
// console.log(minEnergy(8, [1, 2], [0, 7], 10));