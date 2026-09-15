function minimumCosts(regular: number[], express: number[], expressCost: number): number[] {
    // Track the cheapest cost to reach the previous stop on each route; at
    // stop 0 only the regular seat exists, so exp starts unreachable
    // (Infinity). Dropping express -> regular is free; boarding regular ->
    // express costs expressCost every time. Totals stay under 2^53 (about
    // 9e15), so plain Number arithmetic stays exact throughout.
    let reg = 0;
    let exp = Infinity;
    const costs: number[] = [];
    for (let i = 0; i < regular.length; i++) {
        const newReg = Math.min(reg, exp) + regular[i];
        const newExp = Math.min(reg + expressCost, exp) + express[i];
        reg = newReg;
        exp = newExp;
        costs.push(Math.min(reg, exp));
    }
    return costs;
}
