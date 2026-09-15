function baseUnitConversions(conversions: number[][]): number[] {
    // The conversions form a directed tree rooted at unit 0, so one BFS
    // fixes every answer: a child costs `factor` units per unit of its
    // parent, so its value is the parent's value times the factor. That
    // product reaches ~10^18, above Number's exact 2^53 range, so each
    // multiply runs in BigInt and drops back to a Number after the mod.
    // The explicit queue keeps the walk iterative — a 10^5 chain would
    // blow the stack.
    const MOD = 1000000007n;
    const n = conversions.length + 1;
    const children: number[][][] = Array.from({ length: n }, () => []);
    for (const [source, target, factor] of conversions) {
        children[source].push([target, factor]);
    }
    const result = new Array<number>(n).fill(0);
    result[0] = 1;
    const queue: number[] = [0];
    for (let head = 0; head < queue.length; ++head) {
        const node = queue[head];
        for (const [target, factor] of children[node]) {
            result[target] = Number((BigInt(result[node]) * BigInt(factor)) % MOD);
            queue.push(target);
        }
    }
    return result;
}
