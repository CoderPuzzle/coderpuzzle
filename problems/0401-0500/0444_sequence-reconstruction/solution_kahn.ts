function sequenceReconstruction(nums: number[], sequences: number[][]): boolean {
    // Read the sequences as a precedence graph: each consecutive pair pins
    // u before v, and the shortest supersequences are exactly the
    // permutations of [1, n] respecting every pinned pair. Kahn's algorithm
    // peels the graph's sources in order; the order is forced exactly when
    // there is never more than one source to pick from.
    const n = nums.length;
    for (const seq of sequences) {
        for (const x of seq) {
            // A value outside [1, n] cannot occur in nums at all, so nums
            // is not even a supersequence.
            if (x < 1 || x > n) {
                return false;
            }
        }
    }
    const successors: number[][] = Array.from({ length: n + 1 }, () => []);
    const unpinned = new Array<number>(n + 1).fill(0);
    for (const seq of sequences) {
        for (let j = 0; j + 1 < seq.length; ++j) {
            const u = seq[j];
            const v = seq[j + 1];
            // A repeated pair only pads v's count; every copy is discharged
            // together when u is picked, so multiplicity is harmless. A
            // pair pinned to one value never discharges and reads as a loop.
            successors[u].push(v);
            ++unpinned[v];
        }
    }
    // The free values are the ones with no unpinned predecessor left: two
    // at once could each come next, none means the pairs loop.
    const free: number[] = [];
    for (let x = 1; x <= n; ++x) {
        if (unpinned[x] === 0) {
            free.push(x);
        }
    }
    let head = 0;
    for (const want of nums) {
        if (free.length - head !== 1) {
            return false;
        }
        const u = free[head++];
        // The forced next value must be nums's own next value.
        if (u !== want) {
            return false;
        }
        for (const v of successors[u]) {
            if (--unpinned[v] === 0) {
                free.push(v);
            }
        }
    }
    return true;
}
