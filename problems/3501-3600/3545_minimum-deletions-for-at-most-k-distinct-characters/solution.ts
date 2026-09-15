function minDeletion(s: string, k: number): number {
    // At most k distinct characters may survive, so keep the k most
    // frequent ones and delete every occurrence of the rest: the
    // answer is the sum of the (distinct - k) smallest frequencies.
    const counts = new Array(26).fill(0);
    for (const ch of s) counts[ch.charCodeAt(0) - 97]++;
    const freqs = counts.filter((f) => f > 0).sort((a, b) => a - b);
    return freqs.slice(0, Math.max(0, freqs.length - k)).reduce((a, b) => a + b, 0);
}
