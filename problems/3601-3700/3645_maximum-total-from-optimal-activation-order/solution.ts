function maxTotal(value: number[], limit: number[]): number {
    // A limit-L element can only be taken while fewer than L elements are
    // active, and the moment the count reaches L the rest of its group
    // locks out forever — so each group contributes at most its min(L, m)
    // largest values. Sorting by value descending and capping each group
    // at L picks collects exactly those.
    const items: [number, number][] = [];
    for (let i = 0; i < value.length; i++) {
        items.push([value[i], limit[i]]);
    }
    items.sort((a, b) => b[0] - a[0]);
    const taken = new Array<number>(value.length + 1).fill(0);
    let total = 0;
    for (const [v, l] of items) {
        if (taken[l] < l) {
            taken[l]++;
            total += v;
        }
    }
    return total;
}
