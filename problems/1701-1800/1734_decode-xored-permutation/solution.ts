// The chain perm[i + 1] = perm[i] ^ encoded[i] unrolls the whole
// permutation from perm[0], which the permutation premise pins:
// total = 1 ^ ... ^ n is known in advance, and XOR-ing the
// odd-index encoded entries telescopes to perm[1] ^ ... ^
// perm[n - 1] — covering every element but perm[0] exactly
// because n is odd — so perm[0] = total ^ that.
function decode(encoded: number[]): number[] {
    const n = encoded.length + 1;
    let total = 0;
    for (let value = 1; value <= n; value++) {
        total ^= value;
    }
    let odd = 0;
    for (let i = 1; i < encoded.length; i += 2) {
        odd ^= encoded[i];
    }
    let current = total ^ odd;
    const perm: number[] = [current];
    for (const value of encoded) {
        current ^= value;
        perm.push(current);
    }
    return perm;
}
