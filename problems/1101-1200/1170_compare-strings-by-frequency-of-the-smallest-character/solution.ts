function numSmallerByFrequency(queries: string[], words: string[]): number[] {
    const f = (s: string): number => {
        // Smallest character of the string, then how often it appears.
        let smallest = s[0];
        for (let i = 1; i < s.length; i++) {
            if (s[i] < smallest) {
                smallest = s[i];
            }
        }
        let count = 0;
        for (let i = 0; i < s.length; i++) {
            if (s[i] === smallest) {
                count++;
            }
        }
        return count;
    };
    const freqs = words.map(f).sort((a, b) => a - b);
    return queries.map((q) => {
        const p = f(q);
        // Everything strictly above p forms one sorted suffix; find where it
        // starts.
        let lo = 0;
        let hi = freqs.length;
        while (lo < hi) {
            const mid = lo + Math.floor((hi - lo) / 2);
            if (freqs[mid] <= p) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return freqs.length - lo;
    });
}
