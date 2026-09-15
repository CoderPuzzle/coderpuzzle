function canMakePaliQueries(s: string, queries: number[][]): boolean[] {
    const n = s.length;
    // prefix[i] = bitmask of parities of letter counts in s[:i]
    const prefix: number[] = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] ^ (1 << (s.charCodeAt(i) - 97));
    }
    const answer: boolean[] = [];
    for (const [left, right, k] of queries) {
        const mask = prefix[right + 1] ^ prefix[left];
        let odd = 0;
        let m = mask;
        while (m > 0) {
            m &= m - 1;
            odd += 1;
        }
        answer.push(Math.floor(odd / 2) <= k);
    }
    return answer;
}
