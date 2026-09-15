function carPooling(trips: number[][], capacity: number): boolean {
    // difference array over the bounded locations: each trip is just
    // two events, +passengers at pickup and -passengers at dropoff
    const diff = new Array(1001).fill(0);
    for (const [num, start, end] of trips) {
        // dropoff lands at the exact end location, so during the sweep
        // it frees seats before any pickup at the same point
        diff[start] += num;
        diff[end] -= num;
    }
    // index order is the sweep: the running sum is the occupancy
    let used = 0;
    for (const delta of diff) {
        used += delta;
        if (used > capacity) {
            return false;
        }
    }
    return true;
}
