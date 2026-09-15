impl Solution {
    pub fn min_k_bit_flips(nums: Vec<i32>, k: i32) -> i32 {
        let n = nums.len();
        let k = k as usize;
        let mut hint = vec![0i32; n];
        let mut flips = 0;
        // flip = parity of all flip windows still covering index i
        let mut flip = 0;
        for i in 0..n {
            // fold in the flips whose windows end just before i
            flip ^= hint[i];
            // effective bit nums[i] ^ flip is 0: only a flip starting at i
            // can fix it, so the greedy choice is forced
            if (nums[i] ^ flip) == 0 {
                // the forced window would run past the end: impossible
                if i + k > n {
                    return -1;
                }
                flips += 1;
                flip ^= 1;
                // pre-schedule this flip to stop applying after i + k - 1
                if i + k < n {
                    hint[i + k] ^= 1;
                }
            }
        }
        flips
    }
}
