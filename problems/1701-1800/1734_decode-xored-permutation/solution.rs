// The chain perm[i + 1] = perm[i] ^ encoded[i] unrolls the whole
// permutation from perm[0], which the permutation premise pins:
// total = 1 ^ ... ^ n is known in advance, and XOR-ing the
// odd-index encoded entries telescopes to perm[1] ^ ... ^
// perm[n - 1] — covering every element but perm[0] exactly
// because n is odd — so perm[0] = total ^ that.
impl Solution {
    pub fn decode(encoded: Vec<i32>) -> Vec<i32> {
        let n = encoded.len() + 1;
        let mut total = 0;
        for value in 1..=n as i32 {
            total ^= value;
        }
        let mut odd = 0;
        for i in (1..encoded.len()).step_by(2) {
            odd ^= encoded[i];
        }
        let mut current = total ^ odd;
        let mut perm = Vec::with_capacity(n);
        perm.push(current);
        for value in encoded {
            current ^= value;
            perm.push(current);
        }
        perm
    }
}
