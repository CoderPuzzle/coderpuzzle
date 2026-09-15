function findProductsOfElements(queries: number[][]): number[] {
    // exponent totals exceed 2^53 for large indices, so use BigInt throughout
    function countBit(M: bigint, b: number): bigint {
        // count of integers in [1, M] with bit b set
        if (M <= 0n) return 0n;
        const cycle = 1n << BigInt(b + 1);
        const half = 1n << BigInt(b);
        const full = (M + 1n) / cycle;
        const rem = (M + 1n) % cycle;
        const extra = rem - half;
        return full * half + (extra > 0n ? extra : 0n);
    }

    function popcountPrefix(M: bigint): bigint {
        let total = 0n;
        let b = 0;
        while (1n << BigInt(b) <= M) {
            total += countBit(M, b);
            b += 1;
        }
        return total;
    }

    function bitsumPrefix(M: bigint): bigint {
        let total = 0n;
        let b = 0;
        while (1n << BigInt(b) <= M) {
            total += BigInt(b) * countBit(M, b);
            b += 1;
        }
        return total;
    }

    function exponentSum(n: bigint): bigint {
        // sum of exponents of the first n elements of big_nums (n >= 0)
        if (n <= 0n) return 0n;
        let lo = 0n;
        let hi = n;
        while (lo < hi) {
            const mid = (lo + hi + 1n) / 2n;
            if (popcountPrefix(mid) <= n) {
                lo = mid;
            } else {
                hi = mid - 1n;
            }
        }
        const M = lo;
        let total = bitsumPrefix(M);
        let rem = n - popcountPrefix(M);
        if (rem > 0n) {
            const x = M + 1n;
            let b = 0;
            while (rem > 0n) {
                if (((x >> BigInt(b)) & 1n) === 1n) {
                    total += BigInt(b);
                    rem -= 1n;
                }
                b += 1;
            }
        }
        return total;
    }

    const result: number[] = [];
    for (const query of queries) {
        const exp = exponentSum(BigInt(query[1]) + 1n) - exponentSum(BigInt(query[0]));
        // pow(2, exp, mod) with mod <= ~1e5
        const mod = BigInt(query[2]);
        let base = 2n % mod;
        let acc = 1n % mod;
        let e = exp;
        while (e > 0n) {
            if (e & 1n) acc = (acc * base) % mod;
            base = (base * base) % mod;
            e >>= 1n;
        }
        result.push(Number(acc));
    }
    return result;
}
