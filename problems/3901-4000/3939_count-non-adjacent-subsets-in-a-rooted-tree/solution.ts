function countValidSubsets(parent: number[], nums: number[], k: number): number {
    const modulus = 1000000007;
    const n = parent.length;
    const children: number[][] = Array.from({ length: n }, () => []);
    for (let i = 1; i < n; i++) children[parent[i]].push(i);

    const dp0: number[][] = Array.from({ length: n }, () => new Array<number>(k).fill(0));
    const dp1: number[][] = Array.from({ length: n }, () => new Array<number>(k).fill(0));
    for (let node = n - 1; node >= 0; node--) {
        dp0[node][0] = 1;
        dp1[node][nums[node] % k] = 1;
        for (const child of children[node]) {
            const merged0 = new Array<number>(k).fill(0);
            const merged1 = new Array<number>(k).fill(0);
            for (let r0 = 0; r0 < k; r0++) {
                const value0 = dp0[node][r0];
                const value1 = dp1[node][r0];
                if (value0 === 0 && value1 === 0) continue;
                for (let r1 = 0; r1 < k; r1++) {
                    const childAny = (dp0[child][r1] + dp1[child][r1]) % modulus;
                    const product0 = Number((BigInt(value0) * BigInt(childAny)) % BigInt(modulus));
                    const product1 = Number((BigInt(value1) * BigInt(dp0[child][r1])) % BigInt(modulus));
                    merged0[(r0 + r1) % k] = (merged0[(r0 + r1) % k] + product0) % modulus;
                    merged1[(r0 + r1) % k] = (merged1[(r0 + r1) % k] + product1) % modulus;
                }
            }
            dp0[node] = merged0;
            dp1[node] = merged1;
        }
    }
    return (dp0[0][0] + dp1[0][0] - 1 + modulus) % modulus;
}
