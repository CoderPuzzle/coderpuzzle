function beautifulIndices(s: string, a: string, b: string, k: number): number[] {
    const occurrences = (pattern: string, text: string): number[] => {
        const m = pattern.length;
        // KMP failure function: pi[i] is the length of the longest proper
        // prefix of pattern.slice(0, i + 1) that is also its suffix.
        const pi = new Array<number>(m).fill(0);
        let matched = 0;
        for (let i = 1; i < m; i++) {
            while (matched > 0 && pattern[i] !== pattern[matched]) matched = pi[matched - 1];
            if (pattern[i] === pattern[matched]) matched++;
            pi[i] = matched;
        }
        // One scan of text; on a full match the failure function keeps the
        // scan going instead of restarting, so periodic texts stay linear.
        const starts: number[] = [];
        matched = 0;
        for (let i = 0; i < text.length; i++) {
            while (matched > 0 && text[i] !== pattern[matched]) matched = pi[matched - 1];
            if (text[i] === pattern[matched]) matched++;
            if (matched === m) {
                starts.push(i - m + 1);
                matched = pi[matched - 1];
            }
        }
        return starts;
    };
    const inA = occurrences(a, s);
    const inB = occurrences(b, s);
    const result: number[] = [];
    // Both lists ascend and i - k grows along inA, so the first b-occurrence
    // at or after i - k only moves forward: one merge-style pass tests each
    // window [i - k, i + k] in amortized constant time.
    let low = 0;
    for (const i of inA) {
        while (low < inB.length && inB[low] < i - k) low++;
        if (low < inB.length && inB[low] <= i + k) result.push(i);
    }
    return result;
}
