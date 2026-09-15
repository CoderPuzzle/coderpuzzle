impl Solution {
    pub fn filter_occupied_intervals(
        mut occupied_intervals: Vec<Vec<i32>>,
        free_start: i32,
        free_end: i32,
    ) -> Vec<Vec<i32>> {
        occupied_intervals.sort();
        let mut merged: Vec<Vec<i32>> = Vec::new();
        for interval in occupied_intervals {
            let can_merge = merged.last().is_some_and(|last| interval[0] <= last[1] + 1);
            if can_merge {
                let last = merged.last_mut().unwrap();
                last[1] = last[1].max(interval[1]);
            } else {
                merged.push(vec![interval[0], interval[1]]);
            }
        }

        let mut answer = Vec::new();
        for interval in merged {
            let start = interval[0];
            let end = interval[1];
            if free_end < start || free_start > end {
                answer.push(vec![start, end]);
                continue;
            }
            if free_start > start {
                answer.push(vec![start, free_start - 1]);
            }
            if free_end < end {
                answer.push(vec![free_end + 1, end]);
            }
        }
        answer
    }
}
