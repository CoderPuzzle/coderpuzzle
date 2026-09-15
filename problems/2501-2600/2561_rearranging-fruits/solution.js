/**
 * @param {number[]} basket1
 * @param {number[]} basket2
 * @return {number}
 */
var minCost = function (basket1, basket2) {
    // A cost can only be balanced if its combined frequency across the two
    // baskets is even; an odd count makes equality impossible no matter how
    // fruits are swapped.
    const diff = new Map();
    for (const x of basket1) diff.set(x, (diff.get(x) || 0) + 1);
    for (const x of basket2) diff.set(x, (diff.get(x) || 0) - 1);
    // Every |diff| / 2 surplus copies become relocation tickets. Real swaps
    // always pair one export with one import, so among all pooled tickets
    // only the cheapest half genuinely travels far. A ticket costing more
    // than twice the global minimum m is never paid directly: shuttle m out
    // and back around it and the same unit of imbalance clears for a flat
    // 2*m. At most n tickets pay at most n * 2 * 10^9 <= 2*10^14 << 2^53,
    // so plain numbers stay exact.
    const tickets = [];
    for (const [value, delta] of diff) {
        if (delta % 2 !== 0) return -1;
        for (let k = 0; k < Math.abs(delta) / 2; k++) tickets.push(value);
    }
    let smallest = Infinity;
    for (const x of basket1) smallest = Math.min(smallest, x);
    for (const x of basket2) smallest = Math.min(smallest, x);
    tickets.sort((a, b) => a - b);
    const half = Math.floor(tickets.length / 2);
    let answer = 0;
    for (let i = 0; i < half; i++) {
        answer += Math.min(tickets[i], 2 * smallest);
    }
    return answer;
};
