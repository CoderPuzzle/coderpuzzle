impl Solution {
    pub fn path_existence_queries(n: i32, nums: Vec<i32>, max_diff: i32, queries: Vec<Vec<i32>>) -> Vec<bool> {
        let n = n as usize;
        // nums is sorted, so any edge i-j (i < j) forces every consecutive
        // pair between them to be an edge too — components are contiguous
        // segments, cut wherever a gap exceeds max_diff.
        let mut comp = vec![0i32; n];
        for i in 1..n {
            comp[i] = comp[i - 1] + if nums[i] - nums[i - 1] > max_diff { 1 } else { 0 };
        }
        queries
            .iter()
            .map(|q| comp[q[0] as usize] == comp[q[1] as usize])
            .collect()
    }
}
