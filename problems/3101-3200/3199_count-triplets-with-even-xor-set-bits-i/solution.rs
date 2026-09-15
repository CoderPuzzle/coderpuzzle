impl Solution {
    pub fn triplet_count(a: Vec<i32>, b: Vec<i32>, c: Vec<i32>) -> i32 {
        // XOR never creates or destroys parity: every bit position of the
        // result holds the mod-2 sum of the operands' bits there, so a
        // triplet's XOR has an even number of set bits exactly when an even
        // number of its operands — zero or two — carries an odd popcount.
        let arrays = [a, b, c];
        let mut evens = [0; 3];
        let mut odds = [0; 3];
        for (i, nums) in arrays.iter().enumerate() {
            for &x in nums {
                if x.count_ones() % 2 == 0 {
                    evens[i] += 1;
                } else {
                    odds[i] += 1;
                }
            }
        }
        evens[0] * evens[1] * evens[2]
            + odds[0] * odds[1] * evens[2]
            + odds[0] * evens[1] * odds[2]
            + evens[0] * odds[1] * odds[2]
    }
}
