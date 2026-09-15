// A cost can only be balanced if its combined frequency across the two
// baskets is even; an odd count makes equality impossible no matter how
// fruits are swapped. Every |diff| / 2 surplus copies become relocation
// tickets: real swaps always pair one export with one import, so among all
// pooled tickets only the cheapest half genuinely travels far, and any
// ticket above twice the global minimum m clears via the m relay for a flat
// 2*m. At most n tickets pay at most n * 2 * 10^9 <= 2*10^14 << 2^53, so
// plain numbers stay exact.
function minCost(basket1: number[], basket2: number[]): number {
    const diff = new Map<number, number>();
    for (const x of basket1) diff.set(x, (diff.get(x) || 0) + 1);
    for (const x of basket2) diff.set(x, (diff.get(x) || 0) - 1);
    const tickets: number[] = [];
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
}
