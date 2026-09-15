impl Solution {
    pub fn max_score(card_points: Vec<i32>, k: i32) -> i32 {
        let n = card_points.len();
        let total: i64 = card_points.iter().map(|&v| v as i64).sum();
        // taking k cards off the ends always leaves a contiguous middle block
        // of length n-k, so max score = total - min sum of a length n-k window
        let window = n - k as usize;
        let mut current: i64 = card_points[..window].iter().map(|&v| v as i64).sum();
        let mut best = current;
        for i in window..n {
            // slide one position: add the entering card, drop the leaving one
            current += card_points[i] as i64 - card_points[i - window] as i64;
            if current < best {
                best = current;
            }
        }
        (total - best) as i32
    }
}
