impl Solution {
    pub fn max_distance(arrays: Vec<Vec<i32>>) -> i32 {
        // Only each array's first and last elements can sit in an optimal
        // pair, so one sweep holding the smallest first and the largest last
        // of the arrays already seen answers everything. Each new array tries
        // both of its ends against those running extremes — a pairing that
        // always spans two different arrays — and only afterwards folds its
        // own ends in, which keeps the global minimum and maximum from being
        // paired inside a single array.
        let mut best = 0;
        let mut lo = arrays[0][0];
        let mut hi = arrays[0][arrays[0].len() - 1];
        for arr in &arrays[1..] {
            let (first, last) = (arr[0], arr[arr.len() - 1]);
            best = best.max((first - hi).abs()).max((last - lo).abs());
            lo = lo.min(first);
            hi = hi.max(last);
        }
        best
    }
}
