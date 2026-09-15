function canCross(stones: number[]): boolean {
    const n = stones.length;
    const index = new Map<number, number>();
    for (let i = 0; i < n; i++) index.set(stones[i], i);
    // jumps[i] = set of last-jump sizes that can land on stone i
    const jumps: Set<number>[] = Array.from({ length: n }, () => new Set<number>());
    jumps[0].add(0);
    for (let i = 0; i < n; i++) {
        for (const last of jumps[i]) {
            for (const step of [last - 1, last, last + 1]) {
                if (step <= 0) continue;
                const target = stones[i] + step;
                const j = index.get(target);
                if (j !== undefined && j > i) {
                    jumps[j].add(step);
                }
            }
        }
    }
    return jumps[n - 1].size > 0;
}
