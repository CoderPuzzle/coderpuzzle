function countGoodIntegers(n: number, k: number): number {
    const half = Math.floor((n + 1) / 2);
    const fact: number[] = [1];
    for (let i = 1; i <= n; i++) fact.push(fact[i - 1] * i);
    const seen = new Set<string>();
    const limit = Math.pow(10, half);
    for (let first = 0; first < limit; first++) {
        const counts: number[] = new Array(10).fill(0);
        const prefix: number[] = [];
        let v = first;
        for (let i = 0; i < half; i++) {
            prefix.push(v % 10);
            v = Math.floor(v / 10);
        }
        if (prefix[half - 1] === 0) continue;
        const seq: number[] = [];
        for (let i = half - 1; i >= 0; i--) seq.push(prefix[i]);
        if (n % 2 === 0) {
            for (let i = 0; i < half; i++) seq.push(prefix[i]);
        } else {
            for (let i = 1; i < half; i++) seq.push(prefix[i]);
        }
        let value = 0;
        for (const d of seq) {
            counts[d]++;
            value = (value * 10 + d) % k;
        }
        if (value === 0) seen.add(counts.join(","));
    }
    let answer = 0;
    for (const key of seen) {
        const counts = key.split(",").map(Number);
        let total = fact[n];
        for (const c of counts) total = Math.floor(total / fact[c]);
        if (counts[0] > 0) {
            let lead = fact[n - 1];
            lead = Math.floor(lead / fact[counts[0] - 1]);
            for (let d = 1; d < 10; d++) lead = Math.floor(lead / fact[counts[d]]);
            total -= lead;
        }
        answer += total;
    }
    return answer;
}
