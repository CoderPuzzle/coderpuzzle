impl Solution {
    pub fn sort_jumbled(mapping: Vec<i32>, nums: Vec<i32>) -> Vec<i32> {
        // Decorate with (mapped value, original index), stable-sort the
        // pairs by value only, then read the originals back in order.
        fn mapped(mapping: &[i32], value: i32) -> i64 {
            if value == 0 {
                return mapping[0] as i64;
            }
            let mut out = 0i64;
            let mut scale = 1i64;
            let mut rest = value as i64;
            while rest > 0 {
                out += mapping[(rest % 10) as usize] as i64 * scale;
                scale *= 10;
                rest /= 10;
            }
            out
        }
        let mut keyed: Vec<(i64, usize)> = nums
            .iter()
            .enumerate()
            .map(|(i, &v)| (mapped(&mapping, v), i))
            .collect();
        keyed.sort_by(|a, b| a.0.cmp(&b.0));
        keyed.into_iter().map(|(_, i)| nums[i]).collect()
    }
}
