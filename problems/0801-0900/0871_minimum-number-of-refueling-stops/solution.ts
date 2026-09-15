function minRefuelStops(target: number, startFuel: number, stations: number[][]): number {
    let fuel = startFuel;
    const available: number[] = []; // fuels at stations already passed
    let stops = 0;
    let i = 0;
    const n = stations.length;
    while (true) {
        if (fuel >= target) {
            return stops;
        }
        while (i < n && stations[i][0] <= fuel) {
            available.push(stations[i][1]);
            i++;
        }
        if (available.length === 0) {
            return -1;
        }
        let best = 0;
        for (let j = 1; j < available.length; j++) {
            if (available[j] > available[best]) {
                best = j;
            }
        }
        fuel += available[best];
        available[best] = available[available.length - 1];
        available.pop();
        stops++;
    }
}
