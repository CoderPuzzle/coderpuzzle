function popcountDepth(n: number, k: number): number {
    // depth[j] = popcount-depth of the value j itself: 1 has depth 0,
    // deeper values sit one step past their own popcount.
    const depth: number[] = new Array(64).fill(0);
    for (let j = 2; j < 64; ++j) {
        let ones = 0;
        for (let y = j; y > 0; y >>>= 1) ones += y & 1;
        depth[j] = depth[ones] + 1;
    }
    // Digit DP over the binary digits of n: free[x] counts prefixes
    // already strictly below n's prefix that carry x set bits, while
    // tightOnes follows n's exact prefix. n < 2^53, so the divisions by
    // powers of two below are exact; every DP entry counts a subset of
    // [1, n], so each stays <= n < 2^53 and Numbers never lose exactness.
    const free: number[] = new Array(64).fill(0);
    let tightOnes = 0;
    let bitLen = 0;
    for (let t = n; t > 1; t = Math.floor(t / 2)) ++bitLen;
    for (let i = bitLen; i >= 0; --i) {
        const nxt = free.slice();
        for (let x = 0; x < 64; ++x) {
            if (free[x] !== 0) nxt[x + 1] += free[x];
        }
        if (Math.floor(n / 2 ** i) % 2 === 1) {
            // Place 0 under n's 1: that branch goes loose, free to take
            // any suffix of the remaining bits.
            nxt[tightOnes] += 1;
            ++tightOnes;
        }
        for (let x = 0; x < 64; ++x) free[x] = nxt[x];
    }
    // counts[x] = integers in [1, n] with x set bits (0 included).
    const counts = free.slice();
    counts[tightOnes] += 1;
    counts[0] -= 1; // the all-zero string is not a positive integer
    counts[1] -= 1; // x = 1 itself has depth 0, not depth 1
    let answer = k === 0 ? 1 : 0;
    for (let j = 1; j < 64; ++j) {
        if (depth[j] === k - 1) answer += counts[j];
    }
    return answer;
}
