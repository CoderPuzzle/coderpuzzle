impl Solution {
    pub fn minimum_abs_difference(arr: Vec<i32>) -> Vec<Vec<i32>> {
        let mut sorted = arr;
        sorted.sort_unstable();
        let mut best = i32::MAX;
        let mut pairs: Vec<Vec<i32>> = Vec::new();
        for window in sorted.windows(2) {
            let gap = window[1] - window[0];
            if gap < best {
                // A strictly closer neighbour pair retires everything
                // collected against the old minimum.
                best = gap;
                pairs.clear();
            }
            if gap == best {
                pairs.push(vec![window[0], window[1]]);
            }
        }
        pairs
    }
}
