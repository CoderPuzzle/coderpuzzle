function countCollisions(directions: string): number {
    // The only cars that escape forever are the leading run of 'L's
    // (nothing ahead of them ever) and the trailing run of 'R's
    // (nothing behind them ever). Charge every collision to the moving
    // car that arrives at it: a head-on pair costs 2 and involves
    // exactly two movers, and a mover hitting a stationary car or a
    // stopped pile costs 1 and involves exactly one arriving mover —
    // its first collision. So each mover inside the trimmed span
    // contributes exactly 1 and stationary cars contribute nothing:
    // the answer is simply the count of non-'S' characters between the
    // two escape runs.
    const n = directions.length;
    let left = 0;
    while (left < n && directions[left] === "L") {
        left++;
    }
    let right = n - 1;
    while (right >= left && directions[right] === "R") {
        right--;
    }
    let count = 0;
    for (let i = left; i <= right; i++) {
        if (directions[i] !== "S") {
            count++;
        }
    }
    return count;
}
