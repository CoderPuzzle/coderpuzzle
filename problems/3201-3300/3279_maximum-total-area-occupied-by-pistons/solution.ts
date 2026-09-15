function maxArea(height: number, positions: number[], directions: string): number {
    // The total moves each second by (#up - #down); that balance only
    // changes at critical times when a piston lands on an end and turns
    // around. Between critical times the total runs along a straight
    // line, so its peak sits at t = 0 or at some critical time. Totals
    // peak at n * height = 10^11, exact in Number (far below 2^53).
    const events = new Map<number, number>();
    let balance = 0;
    for (let i = 0; i < positions.length; i++) {
        let goingUp: boolean;
        if (positions[i] === 0) {
            goingUp = true;
        } else if (positions[i] === height) {
            goingUp = false;
        } else {
            goingUp = directions[i] === "U";
        }
        const first = goingUp ? height - positions[i] : positions[i];
        if (goingUp) {
            // Landing on the top flips a piston downward.
            events.set(first, (events.get(first) ?? 0) - 2);
            balance++;
            if (first < height) {
                // second landing stays inside period 2h
                events.set(first + height, (events.get(first + height) ?? 0) + 2);
            }
        } else {
            // Landing on the floor flips a piston upward.
            events.set(first, (events.get(first) ?? 0) + 2);
            balance--;
            if (first < height) {
                events.set(first + height, (events.get(first + height) ?? 0) - 2);
            }
        }
    }

    let total = 0;
    for (const p of positions) {
        total += p;
    }
    let best = total;
    let prev = 0;
    for (const t of [...events.keys()].sort((a, b) => a - b)) {
        total += balance * (t - prev);
        best = Math.max(best, total);
        balance += events.get(t)!;
        prev = t;
    }
    return best;
}
