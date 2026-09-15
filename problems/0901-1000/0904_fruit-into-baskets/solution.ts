function totalFruit(fruits: number[]): number {
    // The rules ask for the longest stretch of trees holding at most two
    // fruit types: two baskets, one type each, one fruit from every tree
    // picked while moving right. A sliding window over a type->count map
    // maintains exactly that — extend the right edge tree by tree, and
    // whenever a third type enters, retire trees from the left until one
    // type's count reaches zero and drops out. The window then always
    // spans the longest legal picking trip ending at the current tree, so
    // its length contests the answer at every step.
    const count = new Map<number, number>();
    let best = 0;
    let left = 0;
    for (let right = 0; right < fruits.length; ++right) {
        count.set(fruits[right], (count.get(fruits[right]) ?? 0) + 1);
        while (count.size > 2) {
            const fruit = fruits[left];
            const remaining = (count.get(fruit) ?? 0) - 1;
            if (remaining === 0) {
                count.delete(fruit);
            } else {
                count.set(fruit, remaining);
            }
            ++left;
        }
        best = Math.max(best, right - left + 1);
    }
    return best;
}
