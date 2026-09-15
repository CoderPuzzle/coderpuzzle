function maximumRemovals(s: string, p: string, removable: number[]): number {
    // Classic greedy subsequence scan: skipping removed positions, match each
    // character of p at the earliest opportunity (optimal for containment).
    const stillSubsequence = (k: number): boolean => {
        const removed = new Array<boolean>(s.length).fill(false);
        for (let i = 0; i < k; i++) removed[removable[i]] = true;
        let pi = 0;
        for (let i = 0; i < s.length && pi < p.length; i++) {
            if (!removed[i] && s[i] === p[pi]) pi++;
        }
        return pi === p.length;
    };

    // Feasibility is monotone (fewer deletions only restore characters), so the
    // workable k form an interval starting at 0 — binary search its right end.
    let lo = 0,
        hi = removable.length;
    while (lo < hi) {
        // Upper-mid form keeps the search converging toward the largest feasible k.
        const mid = Math.floor((lo + hi + 1) / 2);
        if (stillSubsequence(mid)) lo = mid;
        else hi = mid - 1;
    }
    return lo;
}
