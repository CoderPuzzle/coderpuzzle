use std::collections::HashMap;

impl Solution {
    pub fn maximum_strong_pair_xor(mut nums: Vec<i32>) -> i32 {
        // Sorted sweep with a sliding window [ceil(y/2), y]: one hash map
        // keyed on the values' bit prefixes (top bit down, each key carrying
        // a leading 1 bit that pins its length), each key counting how many
        // live window values pass through it, answers "best XOR partner of y
        // in the window" greedily. The left pointer retires values whose
        // doubling falls below y.
        nums.sort_unstable();
        const BITS: usize = 20; // nums[i] <= 2^20 - 1
        let mut prefixes: HashMap<i32, i32> = HashMap::new();
        let mut best = 0;
        let mut left = 0usize;
        for &y in nums.iter() {
            // insert y: one key per prefix length, top bit down
            for b in (0..BITS).rev() {
                let key = (1 << (BITS - b)) | (y >> b);
                *prefixes.entry(key).or_insert(0) += 1;
            }
            // retire x from the left while 2 * x < y
            while 2 * nums[left] < y {
                let x = nums[left];
                for b in (0..BITS).rev() {
                    let key = (1 << (BITS - b)) | (x >> b);
                    let count = prefixes.get_mut(&key).unwrap();
                    *count -= 1;
                    if *count == 0 {
                        prefixes.remove(&key);
                    }
                }
                left += 1;
            }
            // query: prefer flipping y's bit while that prefix is live
            let mut p = 1i32; // the leading 1 bit, then no value bits yet
            let mut res = 0i32;
            for b in (0..BITS).rev() {
                let d = (y >> b) & 1;
                let want = (p << 1) | (d ^ 1);
                if prefixes.contains_key(&want) {
                    res |= 1 << b;
                    p = want;
                } else {
                    p = (p << 1) | d;
                }
            }
            best = best.max(res);
        }
        best
    }
}
