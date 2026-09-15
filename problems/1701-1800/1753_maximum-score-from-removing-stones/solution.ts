function maximumScore(a: number, b: number, c: number): number {
    // With x <= y <= z the answer is min(x + y, total / 2): the
    // smaller piles limit how often the big one can be paired, and
    // each move spends exactly two stones.
    const v = [a, b, c].sort((p, q) => p - q);
    const [x, y, z] = v;
    return x + y <= z ? x + y : Math.floor((x + y + z) / 2);
}
