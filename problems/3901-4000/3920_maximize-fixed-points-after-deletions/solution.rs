impl Solution {
    pub fn max_fixed_points(nums: Vec<i32>) -> i32 {
        let mut candidates: Vec<(i32, usize)> = nums
            .iter()
            .enumerate()
            .filter_map(|(index, &value)| {
                (value >= 0 && value as usize <= index).then_some((value, index - value as usize))
            })
            .collect();
        candidates.sort_unstable();
        let mut bit = vec![0i32; nums.len() + 1];
        let mut answer = 0;
        let mut start = 0;
        while start < candidates.len() {
            let mut end = start;
            let mut pending = Vec::new();
            while end < candidates.len() && candidates[end].0 == candidates[start].0 {
                let deletion_count = candidates[end].1;
                let mut index = deletion_count + 1;
                let mut best = 0;
                while index > 0 {
                    best = best.max(bit[index]);
                    index -= index & index.wrapping_neg();
                }
                let length = best + 1;
                pending.push((deletion_count, length));
                answer = answer.max(length);
                end += 1;
            }
            for (deletion_count, length) in pending {
                let mut index = deletion_count + 1;
                while index < bit.len() {
                    bit[index] = bit[index].max(length);
                    index += index & index.wrapping_neg();
                }
            }
            start = end;
        }
        answer
    }
}
