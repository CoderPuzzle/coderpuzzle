function waysToBuyPensPencils(total: number, cost1: number, cost2: number): number {
    let ways = 0;
    for (let pens = 0; pens <= Math.floor(total / cost1); pens++) {
        const remaining = total - pens * cost1;
        ways += Math.floor(remaining / cost2) + 1;
    }
    return ways;
}
