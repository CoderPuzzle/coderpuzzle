function countRoutes(locations: number[], start: number, finish: number, fuel: number): number {
    const MOD = 1_000_000_007;
    const n = locations.length;
    const memo: number[][] = Array.from({ length: n }, () => new Array(fuel + 1).fill(-1));

    const routesFrom = (city: number, remaining: number): number => {
        if (memo[city][remaining] !== -1) return memo[city][remaining];
        // A route may stop here (only valid when this city is the
        // destination) or continue on to any other city that still leaves
        // non-negative fuel; both possibilities are counted.
        let total = city === finish ? 1 : 0;
        for (let neighbor = 0; neighbor < n; ++neighbor) {
            if (neighbor === city) continue;
            const cost = Math.abs(locations[city] - locations[neighbor]);
            if (cost <= remaining) total += routesFrom(neighbor, remaining - cost);
        }
        total %= MOD;
        memo[city][remaining] = total;
        return total;
    };

    return routesFrom(start, fuel);
}
