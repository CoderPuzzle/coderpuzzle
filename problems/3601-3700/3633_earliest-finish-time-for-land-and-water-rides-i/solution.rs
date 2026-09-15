impl Solution {
    pub fn earliest_finish_time(
        landStartTime: Vec<i32>,
        landDuration: Vec<i32>,
        waterStartTime: Vec<i32>,
        waterDuration: Vec<i32>,
    ) -> i32 {
        // Delaying a boarding past an opening never helps, and an earlier
        // first finish never pushes the second boarding later: the second
        // leg starts at max(first finish, second opening). Price both
        // orders for every pair and keep the cheapest.
        let mut best = i32::MAX;
        for i in 0..landStartTime.len() {
            for j in 0..waterStartTime.len() {
                let land_done = landStartTime[i] + landDuration[i];
                let water_done = waterStartTime[j] + waterDuration[j];
                let land_first = land_done.max(waterStartTime[j]) + waterDuration[j];
                let water_first = water_done.max(landStartTime[i]) + landDuration[i];
                best = best.min(land_first.min(water_first));
            }
        }
        best
    }
}
