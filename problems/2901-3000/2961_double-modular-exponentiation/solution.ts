function getGoodIndices(variables: number[][], target: number): number[] {
    // Binary exponentiation keeps every intermediate below the modulus
    // squared; mod can be 1, so the seed starts at 1 % mod. Last digit of
    // a^b first (mod 10), then that residue raised to c modulo m — residues
    // stay below 10^3, so squaring stays exact well under 2^53. The index
    // is good exactly when the second residue equals target.
    const modPow = (base: number, exp: number, mod: number): number => {
        let result = 1 % mod;
        base %= mod;
        while (exp > 0) {
            if (exp & 1) {
                result = (result * base) % mod;
            }
            base = (base * base) % mod;
            exp >>= 1;
        }
        return result;
    };
    const good: number[] = [];
    variables.forEach((row, i) => {
        if (modPow(modPow(row[0], row[1], 10), row[2], row[3]) === target) {
            good.push(i);
        }
    });
    return good;
}
