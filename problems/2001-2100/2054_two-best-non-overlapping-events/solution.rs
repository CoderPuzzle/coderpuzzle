impl Solution {
    pub fn max_two_events(mut events: Vec<Vec<i32>>) -> i32 {
        events.sort_unstable_by_key(|event| event[0]);
        let mut suffix_maximum = vec![0; events.len() + 1];
        for index in (0..events.len()).rev() {
            suffix_maximum[index] = events[index][2].max(suffix_maximum[index + 1]);
        }

        let mut answer = 0;
        for event in &events {
            let mut low = 0;
            let mut high = events.len();
            while low < high {
                let middle = low + (high - low) / 2;
                if events[middle][0] <= event[1] {
                    low = middle + 1;
                } else {
                    high = middle;
                }
            }
            answer = answer.max(event[2] + suffix_maximum[low]);
        }

        answer
    }
}
