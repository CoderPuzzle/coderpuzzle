impl Solution {
    pub fn count_days(days: i32, mut meetings: Vec<Vec<i32>>) -> i32 {
        meetings.sort_by_key(|m| m[0]);
        let mut free: i64 = 0;
        let mut last_end: i64 = 0;
        for meeting in &meetings {
            let start = meeting[0] as i64;
            let end = meeting[1] as i64;
            if start > last_end {
                free += start - last_end - 1;
            }
            if end > last_end {
                last_end = end;
            }
        }
        free += days as i64 - last_end;
        free as i32
    }
}
