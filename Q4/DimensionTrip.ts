function MinDisToEndStation(start: number, stations: number[], end: number, start_station: number): [number, number] {
	let del = 1
	let normalDistance = Math.abs(start - end)
	let firstDistance = Math.abs(stations[start_station] - start)
	let stationDistance = firstDistance + Math.abs(stations[start_station] - end)

	if (start > end)
		del = -1
	while (start_station != 0 || start_station != stations.length - 1) {
		const minDistance = firstDistance + Math.abs(stations[start_station + del] - end)
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

// console.log(minEnergy(0, [4, 9], [3, 6, 8], 11))
// // answer 8
// console.log(minEnergy(7, [4, 9], [3, 6, 8], 11))