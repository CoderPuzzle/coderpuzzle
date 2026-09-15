function minGroupsForValidAssignment(balls: number[]): number {
    // Some box size s must make every box hold s or s + 1 balls, and the
    // value with the fewest copies bounds s by its frequency. For each
    // candidate s, pack each frequency f into f / (s + 1) boxes when it
    // divides evenly, one more box when the remainder can be absorbed by
    // shrinking that many full boxes, or fail; the cheapest feasible s
    // wins.
    const counts = new Map<number, number>();
    for (const ball of balls) {
        counts.set(ball, (counts.get(ball) || 0) + 1);
    }
    const freqs = [...counts.values()];
    let smallest = balls.length;
    for (const f of freqs) {
        smallest = Math.min(smallest, f);
    }
    let best = balls.length;
    for (let size = 1; size <= smallest; ++size) {
        let total = 0;
        let ok = true;
        for (const f of freqs) {
            const big = Math.floor(f / (size + 1));
            const rest = f % (size + 1);
            if (rest !== 0) {
                if (size - rest > big) {
                    ok = false;
                    break;
                }
                total += 1;
            }
            total += big;
        }
        if (ok && total < best) {
            best = total;
        }
    }
    return best;
}
