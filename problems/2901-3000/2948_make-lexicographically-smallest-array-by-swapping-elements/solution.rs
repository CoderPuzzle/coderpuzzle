impl Solution {
    pub fn lexicographically_smallest_array(nums: Vec<i32>, limit: i32) -> Vec<i32> {
        let n = nums.len();
        let mut pairs: Vec<(i32, usize)> = nums.iter().enumerate().map(|(i, &v)| (v, i)).collect();
        pairs.sort(); // lexicographic: value, then index
        let mut result = vec![0i32; n];
        let mut i = 0usize;
        while i < n {
            // A maximal run whose consecutive value gaps are all <= limit is
            // exactly one connected component; any larger gap splits it.
            let mut j = i;
            while j + 1 < n && pairs[j + 1].0 - pairs[j].0 <= limit {
                j += 1;
            }
            // Within a component any permutation is reachable, so place the
            // run's ascending values at its original indices in ascending order.
            let mut indices: Vec<usize> = (i..=j).map(|pos| pairs[pos].1).collect();
            indices.sort();
            for p in i..=j {
                result[indices[p - i]] = pairs[p].0;
            }
            i = j + 1;
        }
        result
    }
}
