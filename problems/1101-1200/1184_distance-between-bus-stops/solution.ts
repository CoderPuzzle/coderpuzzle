function distanceBetweenBusStops(distance: number[], start: number, destination: number): number {
    // Order the stops: edge i leads from stop i to stop i+1, so the
    // clockwise arc between them uses exactly the entries in between.
    const lo = Math.min(start, destination);
    const hi = Math.max(start, destination);
    let total = 0;
    let clockwise = 0;
    for (let i = 0; i < distance.length; i++) {
        total += distance[i];
        if (i >= lo && i < hi) {
            clockwise += distance[i];
        }
    }
    const other = total - clockwise;
    return Math.min(clockwise, other);
}
