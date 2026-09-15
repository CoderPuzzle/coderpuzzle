impl Solution {
    pub fn average(salary: Vec<i64>) -> f64 {
        let mut total = 0i64;
        let mut low = salary[0];
        let mut high = salary[0];
        for &value in &salary {
            total += value;
            if value < low {
                low = value;
            }
            if value > high {
                high = value;
            }
        }
        (total - low - high) as f64 / (salary.len() - 2) as f64
    }
}
