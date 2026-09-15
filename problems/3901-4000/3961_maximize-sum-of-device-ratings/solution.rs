impl Solution {
    pub fn max_ratings(units: Vec<Vec<i32>>) -> i64 {
        if units[0].len() == 1 {
            return units.iter().map(|device| device[0] as i64).sum();
        }

        let mut global_minimum = i32::MAX;
        let mut smallest_second = i32::MAX;
        let mut second_sum = 0_i64;
        for device in units {
            let (mut first, mut second) = (i32::MAX, i32::MAX);
            for capacity in device {
                if capacity < first {
                    second = first;
                    first = capacity;
                } else if capacity < second {
                    second = capacity;
                }
            }
            global_minimum = global_minimum.min(first);
            smallest_second = smallest_second.min(second);
            second_sum += second as i64;
        }
        second_sum - smallest_second as i64 + global_minimum as i64
    }
}
