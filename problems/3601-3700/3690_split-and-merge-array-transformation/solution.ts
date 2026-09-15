function minSplitMerge(nums1: number[], nums2: number[]): number {
    // Every operation costs exactly one layer, so breadth-first search from
    // nums1 reaches nums2 along a shortest operation sequence; the whole
    // state space holds at most n! <= 720 arrays. States are keyed by their
    // comma-joined rendering, which stays unambiguous for integers.
    const start = nums1.join(",");
    const goal = nums2.join(",");
    if (start === goal) {
        return 0;
    }
    const n = nums1.length;
    const seen = new Set([start]);
    let queue: number[][] = [nums1];
    let steps = 0;
    while (queue.length > 0) {
        steps++;
        const next: number[][] = [];
        for (const state of queue) {
            // Cut every subarray [l..r] (single elements included) and paste
            // it at every slot of the remainder.
            for (let l = 0; l < n; l++) {
                for (let r = l; r < n; r++) {
                    const rest = state.slice(0, l).concat(state.slice(r + 1));
                    const piece = state.slice(l, r + 1);
                    for (let i = 0; i <= rest.length; i++) {
                        const candidate = rest.slice(0, i).concat(piece, rest.slice(i));
                        const key = candidate.join(",");
                        if (key === goal) {
                            return steps;
                        }
                        if (!seen.has(key)) {
                            seen.add(key);
                            next.push(candidate);
                        }
                    }
                }
            }
        }
        queue = next;
    }
    return -1; // unreachable: nums2 is guaranteed to be a permutation
}
