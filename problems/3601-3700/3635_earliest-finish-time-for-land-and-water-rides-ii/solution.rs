impl Solution {
    pub fn earliest_finish_time(
        landStartTime: Vec<i32>,
        landDuration: Vec<i32>,
        waterStartTime: Vec<i32>,
        waterDuration: Vec<i32>,
    ) -> i32 {
        // Only the moment the first ride ends matters: the second ride then
        // costs max(open, finish) + duration, which never improves when the
        // hand-off gets later. So each order fixes the earliest-finishing
        // ride of the first category and scans the other category.
        let land_finish = landStartTime
            .iter()
            .zip(&landDuration)
            .map(|(s, d)| s + d)
            .min()
            .unwrap();
        let water_finish = waterStartTime
            .iter()
            .zip(&waterDuration)
            .map(|(s, d)| s + d)
            .min()
            .unwrap();
        let land_first = waterStartTime
            .iter()
            .zip(&waterDuration)
            .map(|(s, d)| (*s).max(land_finish) + d)
            .min()
            .unwrap();
        let water_first = landStartTime
            .iter()
            .zip(&landDuration)
            .map(|(s, d)| (*s).max(water_finish) + d)
            .min()
            .unwrap();
        land_first.min(water_first)
    }
}
