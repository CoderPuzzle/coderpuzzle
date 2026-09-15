impl Solution {
    // Binary exponentiation keeps every intermediate below the modulus
    // squared; mod can be 1, so the seed starts at 1 % mod. Last digit of
    // a^b first (mod 10), then that residue raised to c modulo m — residues
    // stay below 10^3, so squaring fits easily in i64. The index is good
    // exactly when the second residue equals target.
    pub fn get_good_indices(variables: Vec<Vec<i32>>, target: i32) -> Vec<i32> {
        fn mod_pow(mut base: i64, mut exp: i32, mod_: i64) -> i64 {
            let mut result = 1 % mod_;
            base %= mod_;
            while exp > 0 {
                if exp & 1 == 1 {
                    result = result * base % mod_;
                }
                base = base * base % mod_;
                exp >>= 1;
            }
            result
        }
        variables
            .iter()
            .enumerate()
            .filter(|(_, row)| {
                let (a, b, c, m) = (row[0] as i64, row[1], row[2], row[3] as i64);
                mod_pow(mod_pow(a, b, 10), c, m) == target as i64
            })
            .map(|(i, _)| i as i32)
            .collect()
    }
}
