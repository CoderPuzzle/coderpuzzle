function buildWall(height: number, width: number, bricks: number[]): number {
    // A row is fully described by its internal-joint bitmask; adjacent
    // rows must be disjoint. Enumerate row masks once, then run one map-
    // of-counts transition per row. Counts stay in BigInt: with width 10
    // the intermediate sums can exceed Number's exact range before the
    // final mod.
    const MOD = 1000000007n;
    const masks: number[] = [];
    const buildRows = (position: number, mask: number): void => {
        if (position === width) {
            masks.push(mask);
            return;
        }
        for (const brick of bricks) {
            if (position + brick > width) {
                continue;
            }
            const next = position + brick;
            buildRows(next, mask | (next < width ? 1 << (next - 1) : 0));
        }
    };
    buildRows(0, 0);
    if (masks.length === 0) {
        return 0;
    }
    let counts = new Map<number, bigint>();
    for (const mask of masks) {
        counts.set(mask, 1n);
    }
    for (let row = 1; row < height; ++row) {
        const nextCounts = new Map<number, bigint>();
        for (const below of masks) {
            let total = 0n;
            for (const above of masks) {
                if ((above & below) === 0) {
                    total += counts.get(above)!;
                }
            }
            nextCounts.set(below, total % MOD);
        }
        counts = nextCounts;
    }
    let answer = 0n;
    for (const value of counts.values()) {
        answer = (answer + value) % MOD;
    }
    return Number(answer);
}
