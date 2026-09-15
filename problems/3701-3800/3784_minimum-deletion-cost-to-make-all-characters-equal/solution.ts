function minCost(s: string, cost: number[]): number {
    const totals: number[] = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
        totals[s.charCodeAt(i) - 97] += cost[i];
    }
    let sum = 0;
    let best = 0;
    for (const t of totals) {
        sum += t;
        if (t > best) {
            best = t;
        }
    }
    return sum - best;
}
