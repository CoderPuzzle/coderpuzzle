function beautifulIndices(s: string, a: string, b: string, k: number): number[] {
    // An index is beautiful exactly when it is an occurrence of a whose
    // window [i - k, i + k] contains an occurrence of b. Collect both
    // occurrence lists once — each scan advances one character at a time so
    // overlapping occurrences are not skipped — then for each a-occurrence
    // binary-search the sorted b-list for the leftmost entry >= i - k; it
    // qualifies iff that entry also satisfies <= i + k. Ascending
    // a-occurrences keep the answer ascending.
    const occurrences = function (pattern: string): number[] {
        const found: number[] = [];
        for (let start = 0; start + pattern.length <= s.length; start++) {
            if (s.startsWith(pattern, start)) {
                found.push(start);
            }
        }
        return found;
    };
    const whereB = occurrences(b);
    const answer: number[] = [];
    for (const i of occurrences(a)) {
        let low = 0;
        let high = whereB.length;
        while (low < high) {
            const mid = (low + high) >> 1;
            if (whereB[mid] < i - k) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        if (low < whereB.length && whereB[low] <= i + k) {
            answer.push(i);
        }
    }
    return answer;
}
