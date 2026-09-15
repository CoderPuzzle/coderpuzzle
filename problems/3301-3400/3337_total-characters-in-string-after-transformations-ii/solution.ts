function lengthAfterTransformations(s: string, t: number, nums: number[]): number {
    const MOD = 1000000007;
    const mulmod = (a: number, b: number): number => Number((BigInt(a) * BigInt(b)) % 1000000007n);

    const matMul = (a: number[][], b: number[][]): number[][] => {
        const size = a.length;
        const c: number[][] = Array.from({ length: size }, () => new Array<number>(size).fill(0));
        for (let i = 0; i < size; i++) {
            for (let k = 0; k < size; k++) {
                const aik = a[i][k];
                if (aik === 0) continue;
                const rowB = b[k];
                const rowC = c[i];
                for (let j = 0; j < size; j++) {
                    rowC[j] = (rowC[j] + mulmod(aik, rowB[j])) % MOD;
                }
            }
        }
        return c;
    };

    const matPow = (base: number[][], exp: number): number[][] => {
        const size = base.length;
        let result: number[][] = Array.from({ length: size }, (_, i) =>
            Array.from({ length: size }, (_, j) => (i === j ? 1 : 0)),
        );
        while (exp > 0) {
            if (exp & 1) {
                result = matMul(result, base);
            }
            base = matMul(base, base);
            exp = Math.floor(exp / 2);
        }
        return result;
    };

    const v: number[] = new Array(26).fill(0);
    for (let idx = 0; idx < s.length; idx++) {
        v[s.charCodeAt(idx) - 97] += 1;
    }

    // transition[i][j] = 1 if character j produces character i.
    const transition: number[][] = Array.from({ length: 26 }, () => new Array<number>(26).fill(0));
    for (let j = 0; j < 26; j++) {
        for (let a = 1; a <= nums[j]; a++) {
            transition[(j + a) % 26][j] = 1;
        }
    }

    const powered = matPow(transition, t);
    let total = 0;
    for (let i = 0; i < 26; i++) {
        let si = 0;
        for (let j = 0; j < 26; j++) {
            si = (si + mulmod(powered[i][j], v[j])) % MOD;
        }
        total = (total + si) % MOD;
    }
    return total;
}
