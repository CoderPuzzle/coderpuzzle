impl Solution {
    pub fn min_energy(n: i32, brightness: i32, mut intervals: Vec<Vec<i32>>) -> i64 {
        let bulbs = (brightness as i64 + 2) / 3;
        intervals.sort();
        let mut merged: Vec<Vec<i32>> = Vec::new();
        for interval in intervals {
            let can_merge = merged.last().is_some_and(|last| interval[0] <= last[1] + 1);
            if can_merge {
                let last = merged.last_mut().unwrap();
                last[1] = last[1].max(interval[1]);
            } else {
                merged.push(vec![interval[0], interval[1]]);
            }
        }
        let active_time: i64 = merged
            .iter()
            .map(|interval| (interval[1] - interval[0] + 1) as i64)
            .sum();
        bulbs * active_time
    }
}
