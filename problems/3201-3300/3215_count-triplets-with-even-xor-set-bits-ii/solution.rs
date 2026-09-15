// A triplet's XOR has an even number of set bits exactly when an even number
// of the three operands carries an odd popcount: every bit position of the
// XOR holds the mod-2 sum of the operands' bits there, so the XOR preserves
// the parity of the total set-bit count. Counting the even- and odd-parity
// elements of each array leaves four parity classes, and the answer sums the
// three products that pick zero or two odd parities.
impl Solution {
    pub fn triplet_count(a: Vec<i32>, b: Vec<i32>, c: Vec<i32>) -> i64 {
        let arrays = [&a, &b, &c];
        let mut even = [0i64; 3];
        let mut odd = [0i64; 3];
        for (i, nums) in arrays.iter().enumerate() {
            for &x in nums.iter() {
                if x.count_ones() % 2 == 0 {
                    even[i] += 1;
                } else {
                    odd[i] += 1;
                }
            }
        }
        even[0] * even[1] * even[2] + odd[0] * odd[1] * even[2] + odd[0] * even[1] * odd[2] + even[0] * odd[1] * odd[2]
    }
}
