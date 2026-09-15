function maxOperations(nums: number[]): number {
    // The first operation fixes the score, and its pair is one of three:
    // the two head elements, the two tail elements, or both end elements.
    const n = nums.length;
    const openingScores = new Set([nums[0] + nums[1], nums[0] + nums[n - 1], nums[n - 2] + nums[n - 1]]);
    let best = 0;
    for (const target of openingScores) {
        // Every operation deletes exactly two elements, so a window keeps
        // its width parity; roll one dp layer per reachable width.
        let previous = new Array<number>(n + 2).fill(0);
        for (let width = 2 + (n % 2); width <= n; width += 2) {
            const current = new Array<number>(n - width + 1).fill(0);
            for (let left = 0; left + width <= n; left++) {
                const right = left + width - 1;
                let value = 0;
                if (nums[left] + nums[right] === target) value = Math.max(value, 1 + previous[left + 1]);
                if (nums[left] + nums[left + 1] === target) value = Math.max(value, 1 + previous[left + 2]);
                if (nums[right - 1] + nums[right] === target) value = Math.max(value, 1 + previous[left]);
                current[left] = value;
            }
            previous = current;
        }
        best = Math.max(best, previous[0]);
    }
    return best;
}
