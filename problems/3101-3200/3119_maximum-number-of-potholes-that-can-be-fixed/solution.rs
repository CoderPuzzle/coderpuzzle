impl Solution {
    pub fn max_potholes(road: String, budget: i32) -> i32 {
        // Whole long runs are cheapest per pothole (L / (L + 1) grows with
        // L), so take longest runs first; when a full run no longer fits
        // only one partial purchase remains, worth budget - 1 potholes.
        let mut lengths: Vec<i32> = road
            .split('.')
            .filter(|run| !run.is_empty())
            .map(|run| run.len() as i32)
            .collect();
        lengths.sort_unstable_by(|a, b| b.cmp(a));
        let mut fixed = 0;
        let mut left = budget;
        for length in lengths {
            if left >= length + 1 {
                left -= length + 1;
                fixed += length;
            } else {
                fixed += (left - 1).max(0);
                break;
            }
        }
        fixed
    }
}
