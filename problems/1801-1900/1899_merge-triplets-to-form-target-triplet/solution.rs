impl Solution {
    // Drop overshooters; the survivors' componentwise max is the
    // best-reachable triplet.
    pub fn merge_triplets(triplets: Vec<Vec<i32>>, target: Vec<i32>) -> bool {
        let mut best = [0i32; 3];
        for t in &triplets {
            if t[0] <= target[0] && t[1] <= target[1] && t[2] <= target[2] {
                for i in 0..3 {
                    best[i] = best[i].max(t[i]);
                }
            }
        }
        best[0] == target[0] && best[1] == target[1] && best[2] == target[2]
    }
}
