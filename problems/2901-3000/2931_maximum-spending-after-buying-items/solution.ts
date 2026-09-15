function maxSpending(values: number[][]): number {
    // Each row is non-increasing, so a shop's cheapest unbought item
    // always sits at the moving tail. Buying the globally cheapest tail
    // on each (cheapest-first) day pairs every value with the smallest
    // day it can still take, which an exchange argument shows is
    // optimal: swapping any two days' purchases never pays. The answer
    // is bounded by 10^6 * (10^5)(10^5+1)/2 = 5.00005 * 10^15 < 2^53,
    // so plain Number arithmetic is exact throughout.
    const tails = values.map((row, shop) => ({
        value: row[row.length - 1],
        shop,
        position: row.length - 1,
    }));
    let total = 0;
    const days = values.length * values[0].length;
    for (let day = 1; day <= days; day++) {
        let best = 0;
        for (let index = 1; index < tails.length; index++) {
            if (tails[index].value < tails[best].value) {
                best = index;
            }
        }
        const tail = tails[best];
        total += tail.value * day;
        if (tail.position > 0) {
            tail.value = values[tail.shop][tail.position - 1];
            tail.position -= 1;
        } else {
            tails.splice(best, 1);
        }
    }
    return total;
}
