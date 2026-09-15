impl Solution {
    // Difference array over years: +1 at birth, -1 at death; a prefix sweep
    // reconstructs each year's population.
    pub fn maximum_population(logs: Vec<Vec<i32>>) -> i32 {
        let mut delta = vec![0i32; 2052];
        for log in &logs {
            delta[log[0] as usize] += 1;
            delta[log[1] as usize] -= 1;
        }
        let mut best_year = 1950i32;
        let mut best_pop = -1i32;
        let mut cur = 0i32;
        for year in 1950..=2050 {
            cur += delta[year as usize];
            if cur > best_pop {
                best_pop = cur;
                best_year = year;
            }
        }
        best_year
    }
}
