function minimumCost(sentence: string, k: number): number {
    const words = sentence.split(" ");
    const count = words.length;
    const dp = new Array<number>(count + 1).fill(0);

    for (let start = count - 1; start >= 0; --start) {
        let best = Number.POSITIVE_INFINITY;
        let rowLength = 0;
        for (let end = start; end < count; ++end) {
            rowLength += words[end].length + (end > start ? 1 : 0);
            if (rowLength > k) break;
            let candidate = 0;
            if (end !== count - 1) {
                const unused = k - rowLength;
                candidate = unused * unused + dp[end + 1];
            }
            best = Math.min(best, candidate);
        }
        dp[start] = best;
    }
    return dp[0];
}
