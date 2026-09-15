function minCost(nums: number[], x: number): number {
    // Try every rotation count k in [0, n): after k operations, buying
    // type t costs nums[(t - k) mod n], so each step only adds one new
    // candidate price per type on top of the ones already seen.
    const n = nums.length;
    // cheapest[t] tracks the lowest price seen so far for type t; totals
    // stay far below Number.MAX_SAFE_INTEGER.
    const cheapest = [...nums];
    let answer = cheapest.reduce((sum, price) => sum + price, 0);
    for (let rotations = 1; rotations < n; ++rotations) {
        let total = 0;
        for (let t = 0; t < n; ++t) {
            const price = nums[(t + n - rotations) % n];
            if (price < cheapest[t]) {
                cheapest[t] = price;
            }
            total += cheapest[t];
        }
        answer = Math.min(answer, total + rotations * x);
    }
    return answer;
}
