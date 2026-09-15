function findMinMoves(machines: number[]): number {
    // A move passes dresses around but creates none, so equalizing first
    // requires total % n == 0. Afterwards the answer is the largest of two
    // one-per-move bottlenecks: the net dresses forced across any one
    // boundary, and any single machine's excess — a machine gives away one
    // dress per move even when both neighbors are short.
    const total = machines.reduce((sum, dresses) => sum + dresses, 0);
    const count = machines.length;
    if (total % count !== 0) {
        return -1;
    }
    const average = total / count;
    let moves = 0;
    let crossing = 0;
    for (const dresses of machines) {
        // `crossing` is the traffic the boundary on this machine's right
        // must carry: the left block's surplus, forced in any schedule.
        crossing += dresses - average;
        moves = Math.max(moves, Math.abs(crossing), dresses - average);
    }
    return moves;
}
