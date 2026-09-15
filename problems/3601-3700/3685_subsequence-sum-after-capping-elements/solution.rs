impl Solution {
    pub fn subsequence_sum_after_capping(nums: Vec<i32>, k: i32) -> Vec<bool> {
        let n = nums.len();
        let words = (k as usize + 64) / 64;
        let mut reach = vec![0u64; words];
        let mut shifted = vec![0u64; words];
        reach[0] = 1;
        let mut counts = vec![0usize; n + 1];
        for &value in &nums {
            counts[value as usize] += 1;
        }
        let mut answer = vec![false; n];
        let mut leq = 0usize;
        for x in 1..=n {
            for _ in 0..counts[x] {
                fold_in(&mut reach, &mut shifted, x);
            }
            leq += counts[x];
            let above = n - leq;
            let mut found = false;
            let mut m = 0usize;
            let mut r: i64 = k as i64;
            while m <= above && r >= 0 {
                let bit = r as usize;
                if (reach[bit >> 6] >> (bit & 63)) & 1 == 1 {
                    found = true;
                    break;
                }
                m += 1;
                r -= x as i64;
            }
            answer[x - 1] = found;
        }
        answer
    }
}

fn fold_in(reach: &mut [u64], shifted: &mut [u64], x: usize) {
    let word_shift = x >> 6;
    let bit_shift = x & 63;
    for i in 0..shifted.len() {
        let src = i as i64 - word_shift as i64;
        let mut value = 0u64;
        if src >= 0 {
            let src = src as usize;
            value = reach[src] << bit_shift;
            if bit_shift != 0 && src >= 1 {
                value |= reach[src - 1] >> (64 - bit_shift);
            }
        }
        shifted[i] = value;
    }
    for i in 0..reach.len() {
        reach[i] |= shifted[i];
    }
}
