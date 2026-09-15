impl Solution {
    pub fn smallest_trimmed_numbers(nums: Vec<String>, queries: Vec<Vec<i32>>) -> Vec<i32> {
        // All strings share one length, so trimmed suffixes do too, and
        // lexicographic order on equal-length digit strings equals numeric
        // order — no numeric conversion needed (suffixes can exceed 64 bits).
        let mut order: Vec<usize> = (0..nums.len()).collect();
        let mut answer = Vec::with_capacity(queries.len());
        for query in &queries {
            let k = query[0] as usize;
            let trim = query[1] as usize;
            order.sort_by(|&left, &right| {
                let a = &nums[left][nums[left].len() - trim..];
                let b = &nums[right][nums[right].len() - trim..];
                a.cmp(b).then(left.cmp(&right))
            });
            answer.push(order[k - 1] as i32);
        }
        answer
    }
}
