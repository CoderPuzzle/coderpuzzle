impl Solution {
    pub fn maximum_bags(capacity: Vec<i32>, rocks: Vec<i32>, additionalRocks: i32) -> i32 {
        let mut needs: Vec<i64> = capacity
            .iter()
            .zip(rocks.iter())
            .map(|(&c, &r)| c as i64 - r as i64)
            .collect();
        needs.sort_unstable();
        let mut remaining = additionalRocks as i64;
        let mut full = 0;
        for need in needs {
            if need > remaining {
                break;
            }
            remaining -= need;
            full += 1;
        }
        full
    }
}
