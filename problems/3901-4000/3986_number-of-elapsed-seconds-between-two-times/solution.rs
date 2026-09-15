impl Solution {
    pub fn seconds_between_times(start_time: String, end_time: String) -> i32 {
        let seconds = |value: &str| -> i32 {
            let hours = value[0..2].parse::<i32>().unwrap();
            let minutes = value[3..5].parse::<i32>().unwrap();
            let seconds = value[6..8].parse::<i32>().unwrap();
            hours * 3600 + minutes * 60 + seconds
        };
        seconds(&end_time) - seconds(&start_time)
    }
}
