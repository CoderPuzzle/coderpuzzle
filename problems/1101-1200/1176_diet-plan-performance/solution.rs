impl Solution {
    fn score(total: i64, lower: i64, upper: i64) -> i64 {
        if total < lower {
            -1
        } else if total > upper {
            1
        } else {
            0
        }
    }

    pub fn diet_plan_performance(calories: Vec<i32>, k: i32, lower: i32, upper: i32) -> i32 {
        let k = k as usize;
        let mut points: i64 = 0;
        // Sum the first window once; every later window shares k-1 days
        // with its predecessor.
        let mut window: i64 = calories[..k].iter().map(|&c| c as i64).sum();
        points += Self::score(window, lower as i64, upper as i64);
        for i in k..calories.len() {
            window += calories[i] as i64 - calories[i - k] as i64;
            points += Self::score(window, lower as i64, upper as i64);
        }
        points as i32
    }
}
