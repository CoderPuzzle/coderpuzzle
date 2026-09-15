// A nice divisor carries at least one copy of every prime of n, so for
// n = p^a * q^b * ... the nice divisors number a * b * ...: the answer is
// the largest product of positive integers summing to at most
// primeFactors, and a part of size 1 never changes a product, so the
// budget is spent exactly. Break rule: a part x > 4 splits into
// floor(x/2) + ceil(x/2) with a larger product, and three 2s lose to two
// 3s, so only 3s and at most two 2s remain -- n <= 4 answers n itself;
// n % 3 == 0 -> 3^(n/3); n % 3 == 1 -> 4 * 3^((n-4)/3), where 2 + 2
// beats 3 + 1; n % 3 == 2 -> 2 * 3^(n/3). The exponent reaches 10^9 / 3
// and the product of two mod-reduced residues reaches (10^9 + 6)^2
// ~ 10^18, past the double's exact 2^53 range, so the
// square-and-multiply runs on bigint and converts back only after the
// final reduction.
function maxNiceDivisors(primeFactors: number): number {
    const mod = 1000000007n;
    const n = primeFactors;
    if (n <= 4) {
        return n;
    }
    let residue: bigint;
    let power: number;
    if (n % 3 === 0) {
        residue = 1n;
        power = Math.floor(n / 3);
    } else if (n % 3 === 1) {
        residue = 4n;
        power = Math.floor((n - 4) / 3);
    } else {
        residue = 2n;
        power = Math.floor(n / 3);
    }
    let result = residue;
    let base = 3n;
    while (power > 0) {
        if (power % 2 === 1) {
            result = (result * base) % mod;
        }
        base = (base * base) % mod;
        power = Math.floor(power / 2);
    }
    return Number(result);
}
