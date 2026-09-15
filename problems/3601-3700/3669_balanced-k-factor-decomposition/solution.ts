function minDifference(n: number, k: number): number[] {
    // Trial division up to sqrt(n) gathers each divisor pair (d, n / d);
    // sorted ascending, they are the only values a decomposition can use.
    const divs: number[] = [];
    for (let d = 1; d * d <= n; d++) {
        if (n % d === 0) {
            divs.push(d);
            if (d * d !== n) {
                divs.push(n / d);
            }
        }
    }
    divs.sort((a, b) => a - b);

    // Building factors in nondecreasing order makes the search visit
    // complete splits in lexicographic order, so replacing the best only on
    // a strictly smaller spread pins the lexicographically smallest optimal
    // split.
    let best: number[] = [];

    const dfs = (start: number, slots: number, prod: number, path: number[]): void => {
        if (slots === 1) {
            // The last factor is forced to carry the product up to n; it
            // completes a nondecreasing split exactly when it reaches the
            // last pick. Both ends of the spread then sit on the path.
            const last = Math.floor(n / prod);
            if (last * prod === n && (path.length === 0 || last >= path[path.length - 1])) {
                const spread = path.length === 0 ? 0 : last - path[0];
                if (best.length === 0 || spread < best[best.length - 1] - best[0]) {
                    best = path.concat([last]);
                }
            }
            return;
        }
        for (let i = start; i < divs.length; i++) {
            if (divs[i] * prod > n) {
                break;
            }
            dfs(i, slots - 1, prod * divs[i], path.concat([divs[i]]));
        }
    };
    dfs(0, k, 1, []);
    return best;
}
