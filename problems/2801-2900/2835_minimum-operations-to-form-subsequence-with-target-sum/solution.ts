function minOperations(nums: number[], target: number): number {
    // Bucket elements by their power-of-two exponent. Element sums reach
    // 1000 * 2^30, well under 2^53, so plain numbers carry the running total
    // exactly.
    const count: number[] = new Array<number>(62).fill(0);
    let total = 0;
    for (const num of nums) {
        count[31 - Math.clz32(num)] += 1;
        total += num;
    }
    // Every operation preserves the array sum, so a subsequence can never
    // exceed it.
    if (total < target) {
        return -1;
    }
    let operations = 0;
    for (let bit = 0; bit <= 30; bit++) {
        if ((target >> bit) & 1) {
            if (count[bit] > 0) {
                count[bit] -= 1;
            } else {
                let source = bit + 1;
                while (count[source] === 0) {
                    source += 1;
                }
                // Unreachable given the total check; a defensive stop.
                if (source > 60) {
                    return -1;
                }
                operations += source - bit;
                count[source] -= 1;
                // The split chain banks one spare twin at every passed level
                // and its own twin right at the needed level.
                for (let spare = bit + 1; spare < source; spare++) {
                    count[spare] += 1;
                }
                count[bit] += 1;
            }
        }
        // Leftover pairs at this level stand in for the element one level up,
        // so they feed the next iteration for free.
        count[bit + 1] += Math.floor(count[bit] / 2);
    }
    return operations;
}
