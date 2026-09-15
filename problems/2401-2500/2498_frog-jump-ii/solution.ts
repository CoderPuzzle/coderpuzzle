function maxJump(stones: number[]): number {
    // The round trip splits into two interleaved routes sharing both
    // endpoints: outbound lands on every other stone, return picks up the
    // skipped ones. Each interior stone's worst-case hop is then to the
    // second neighbor, so the bottleneck jump is the maximum of
    // stones[i] - stones[i-2], floored by the opening hop.
    let best = stones[1] - stones[0];
    for (let i = 2; i < stones.length; ++i) {
        const gap = stones[i] - stones[i - 2];
        if (gap > best) best = gap;
    }
    return best;
}
