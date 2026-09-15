impl Solution {
    pub fn eliminate_maximum(dist: Vec<i32>, speed: Vec<i32>) -> i32 {
        // Monster i reaches the city at minute ceil(dist[i]/speed[i]) — at
        // that exact minute it already counts as a loss. The i-th shot
        // happens at minute i, so after sorting arrival minutes the answer
        // is the first position where the arrival is not strictly later
        // than the shot.
        let mut arrivals: Vec<i32> = dist.iter().zip(speed.iter()).map(|(&d, &s)| (d + s - 1) / s).collect();
        arrivals.sort_unstable();
        for (i, &a) in arrivals.iter().enumerate() {
            if a <= i as i32 {
                return i as i32;
            }
        }
        dist.len() as i32
    }
}
