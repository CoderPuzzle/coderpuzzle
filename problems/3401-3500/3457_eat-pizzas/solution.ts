function maxWeight(pizzas: number[]): number {
    // Odd days bank their maximum, so the ceil(d/2) odd days claim the
    // top weights first; each even day then banks the second pizza of a
    // consecutive top pair. The total is at most 5e4 * 1e5 = 5e9 < 2^53,
    // exact as a JS number.
    pizzas.sort((a, b) => a - b);
    const n = pizzas.length;
    const oddDays = Math.floor((Math.floor(n / 4) + 1) / 2);
    let total = 0;
    let top = n - 1;
    for (let i = 0; i < oddDays; i++) {
        total += pizzas[top];
        top--;
    }
    for (let i = 0; i < Math.floor(n / 4) - oddDays; i++) {
        top--;
        total += pizzas[top];
        top--;
    }
    return total;
}
