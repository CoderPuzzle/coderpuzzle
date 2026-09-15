function countExcellentPairs(nums: number[], k: number): number {
    // identity: popcount(a|b) + popcount(a&b) = popcount(a) + popcount(b), so
    // the pair condition depends only on the two individual bit counts
    // dedupe: pairs are counted over distinct values
    const unique = Array.from(new Set(nums));
    // bucket distinct values by their set-bit count
    const counts = new Map<number, number>();
    for (const x of unique) {
        let b = 0;
        let v = x;
        while (v > 0) {
            b += v & 1;
            v = Math.floor(v / 2);
        }
        counts.set(b, (counts.get(b) || 0) + 1);
    }
    let answer = 0;
    // ordered bucket pairs: c1*c2 covers (a,b) and (b,a), plus (a,a) once
    for (const [b1, c1] of counts) {
        for (const [b2, c2] of counts) {
            if (b1 + b2 >= k) answer += c1 * c2;
        }
    }
    return answer;
}
