impl Solution {
    pub fn earliest_full_bloom(plant_time: Vec<i32>, grow_time: Vec<i32>) -> i32 {
        let mut idx: Vec<usize> = (0..plant_time.len()).collect();
        // Total planting time is fixed regardless of order, so only the
        // order matters: by an exchange argument, plant slow-growing seeds
        // first so their long growth overlaps the planting of the rest.
        idx.sort_by(|&a, &b| grow_time[b].cmp(&grow_time[a]));
        let mut best = 0;
        let mut prefix = 0;
        for &i in &idx {
            // prefix is when seed i finishes planting; it blooms at
            // prefix + grow_time[i]. The answer is the max over all seeds —
            // a seed finished early can still bloom last.
            prefix += plant_time[i];
            best = best.max(prefix + grow_time[i]);
        }
        best
    }
}
