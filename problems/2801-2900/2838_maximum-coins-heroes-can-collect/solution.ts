function maximumCoins(heroes: number[], monsters: number[], coins: number[]): number[] {
    // A hero that beats one monster beats every monster of smaller-or-equal
    // power too, so sorting (power, coin) pairs makes each answer a prefix
    // sum over that order: binary-search how many monsters sit at or below
    // the hero's power and read prefix[k]. Totals reach 10^5 * 10^9 = 10^11,
    // far below 2^53, so plain numbers stay exact.
    const order = monsters.map((_, i) => i).sort((a, b) => monsters[a] - monsters[b]);
    const prefix = new Array<number>(monsters.length + 1);
    prefix[0] = 0;
    for (let i = 0; i < order.length; ++i) {
        prefix[i + 1] = prefix[i] + coins[order[i]];
    }
    return heroes.map((hero) => {
        let lo = 0;
        let hi = order.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (monsters[order[mid]] <= hero) lo = mid + 1;
            else hi = mid;
        }
        return prefix[lo];
    });
}
