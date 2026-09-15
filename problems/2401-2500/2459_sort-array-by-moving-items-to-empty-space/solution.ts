function sortArray(nums: number[]): number {
    const n = nums.length;
    const opsFor = (target: number[]): number => {
        // sigma[i] = destination slot of the item currently at slot i.
        const sigma = new Array<number>(n);
        for (let i = 0; i < n; i++) sigma[i] = target[nums[i]];
        let blank = -1;
        for (let i = 0; i < n; i++) {
            if (nums[i] === 0) {
                blank = i;
                break;
            }
        }
        const visited = new Array<boolean>(n).fill(false);
        let total = 0;
        for (let i = 0; i < n; i++) {
            if (visited[i]) continue;
            // Walk one cycle of the permutation i -> sigma[i].
            let length = 0;
            let hasBlank = false;
            let j = i;
            while (!visited[j]) {
                visited[j] = true;
                if (j === blank) hasBlank = true;
                length++;
                j = sigma[j];
            }
            if (hasBlank) {
                // Each move drops one item into the hole the blank occupies,
                // walking the blank home: length - 1 moves.
                total += length - 1;
            } else if (length >= 2) {
                // One extra move pulls the blank into this cycle (an item
                // gets displaced to the blank's own goal), then L in-cycle
                // placements return it: L + 1 moves.
                total += length + 1;
            }
            // Length-1 cycles are already home and cost nothing.
        }
        return total;
    };
    const targetA = new Array<number>(n);
    const targetB = new Array<number>(n);
    for (let v = 0; v < n; v++) {
        targetA[v] = v === 0 ? n - 1 : v - 1;
        targetB[v] = v;
    }
    // Two sorted layouts exist — blank last or blank first; compare both
    // (an array cheap for one goal can be dear for the other).
    return Math.min(opsFor(targetA), opsFor(targetB));
}
