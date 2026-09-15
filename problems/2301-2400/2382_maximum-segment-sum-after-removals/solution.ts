function maximumSegmentSum(nums: number[], removeQueries: number[]): number[] {
    const n = nums.length;
    const parent = new Array<number>(n);
    for (let i = 0; i < n; i++) parent[i] = i;
    const ssum = new Array<number>(n).fill(0);
    const active = new Array<boolean>(n).fill(false);

    function find(x: number): number {
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    // Reverse time: removals become activations, so the process only
    // ever merges segments. The leading 0 is the answer after the last
    // removal, where nothing remains; skip removeQueries[0] (all other
    // positions are still active at that point).
    const answer: number[] = [0];
    let best = 0;
    for (let qi = removeQueries.length - 1; qi >= 1; qi--) {
        const i = removeQueries[qi];
        active[i] = true;
        ssum[i] = nums[i];
        // Merge with any active neighbor; the component total stays at
        // the new root, so ssum[find(i)] is the whole merged block.
        for (const j of [i - 1, i + 1]) {
            if (j >= 0 && j < n && active[j]) {
                const a = find(i),
                    b = find(j);
                if (a !== b) {
                    parent[a] = b;
                    ssum[b] += ssum[a];
                }
            }
        }
        // Segments only grow along the reversed timeline, so the running
        // max is monotone — one max per step, nothing to evict.
        best = Math.max(best, ssum[find(i)]);
        answer.push(best);
    }
    answer.reverse();
    return answer;
}
