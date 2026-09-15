use std::collections::HashMap;

impl Solution {
    // Two unordered pairs with equal products never share an element —
    // a * b = a * c would force b = c — so any 2 of the c pairs over
    // one product use four distinct elements and extend to exactly 8
    // tuples: choose the two pairs (C(c, 2) ways), order each pair
    // (2 * 2), and choose which pair plays (a, b) (2). Products top
    // out at 10^8 and the count at a few times 10^7, both inside the
    // 32-bit answer type.
    pub fn tuple_same_product(nums: Vec<i32>) -> i32 {
        let mut pairs: HashMap<i32, i32> = HashMap::new();
        for i in 0..nums.len() {
            for j in i + 1..nums.len() {
                *pairs.entry(nums[i] * nums[j]).or_insert(0) += 1;
            }
        }
        let mut total = 0;
        for &count in pairs.values() {
            total += count * (count - 1) / 2 * 8;
        }
        total
    }
}
