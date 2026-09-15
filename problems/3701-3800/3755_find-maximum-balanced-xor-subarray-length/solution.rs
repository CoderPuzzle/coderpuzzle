use std::collections::HashMap;

impl Solution {
    // Two prefixes pin a window down: a repeated prefix XOR cancels the
    // shared head (the window's own XOR is 0), and a repeated parity gap
    // (evens minus odds so far) means the window's even and odd counts
    // tie. Matching pairs therefore bracket a balanced, zero-XOR
    // subarray, and the earliest occurrence of each pair maximizes the
    // length read off it.
    //
    // The pair packs into one i64 key: pxor < 2^30 and gap + n lies in
    // [0, 2n], so pxor * (2n + 1) + (gap + n) fits far below 2^63.
    pub fn max_balanced_subarray(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let width = (2 * n + 1) as i64;
        let mut first: HashMap<i64, isize> = HashMap::with_capacity(n + 1);
        first.insert(n as i64, -1);
        let mut pxor = 0i32;
        let mut gap = 0i32;
        let mut best = 0usize;
        for (i, &value) in nums.iter().enumerate() {
            pxor ^= value;
            gap += if value % 2 == 0 { 1 } else { -1 };
            let key = pxor as i64 * width + (gap as i64 + n as i64);
            match first.get(&key) {
                Some(&j) => {
                    let length = i as isize - j;
                    if length as usize > best {
                        best = length as usize;
                    }
                }
                None => {
                    first.insert(key, i as isize);
                }
            }
        }
        best as i32
    }
}
