impl Solution {
    pub fn kth_remaining_integer(nums: Vec<i32>, queries: Vec<Vec<i32>>) -> Vec<i32> {
        let mut positions = Vec::new();
        let mut adjusted = Vec::new();
        for (index, value) in nums.into_iter().enumerate() {
            if value % 2 == 0 {
                positions.push(index);
                adjusted.push(value / 2 - (positions.len() - 1) as i32);
            }
        }

        queries
            .into_iter()
            .map(|query| {
                let first = positions.partition_point(|&position| position < query[0] as usize);
                let last = positions.partition_point(|&position| position <= query[1] as usize);
                let crossed = adjusted[first..last].partition_point(|&value| value <= query[2] - first as i32);
                2 * (query[2] + crossed as i32)
            })
            .collect()
    }
}
