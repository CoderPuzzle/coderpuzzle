impl Solution {
    pub fn latest_time_catch_the_bus(mut buses: Vec<i32>, mut passengers: Vec<i32>, capacity: i32) -> i32 {
        buses.sort_unstable();
        passengers.sort_unstable();
        let mut boarded = 0;
        let mut j = 0usize;
        for bus in buses.iter() {
            boarded = 0;
            while j < passengers.len() && boarded < capacity && passengers[j] <= *bus {
                j += 1;
                boarded += 1;
            }
        }
        let mut answer = if boarded < capacity {
            *buses.last().unwrap()
        } else {
            passengers[j - 1] - 1
        };
        let taken: std::collections::HashSet<i32> = passengers.iter().copied().collect();
        while taken.contains(&answer) {
            answer -= 1;
        }
        answer
    }
}
