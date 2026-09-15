use std::collections::HashMap;

impl Solution {
    pub fn max_sum_distinct_triplet(x: Vec<i32>, y: Vec<i32>) -> i32 {
        // Each x-value can enter the triplet at most once, so only its best
        // y matters: keep the maximum y per distinct x in a hash map.
        let mut best: HashMap<i32, i32> = HashMap::new();
        for i in 0..x.len() {
            let slot = best.entry(x[i]).or_insert(0);
            if y[i] > *slot {
                *slot = y[i];
            }
        }
        if best.len() < 3 {
            return -1;
        }
        // The answer is the sum of the three largest per-x maxima.
        let mut top = [0i32; 3];
        for v in best.values() {
            if *v > top[0] {
                top = [*v, top[0], top[1]];
            } else if *v > top[1] {
                top = [top[0], *v, top[1]];
            } else if *v > top[2] {
                top[2] = *v;
            }
        }
        top[0] + top[1] + top[2]
    }
}
