impl Solution {
    pub fn largest_time_from_digits(arr: Vec<i32>) -> String {
        // Four slots H1 H2 M1 M2 and four digits admit exactly 4! = 24
        // deals. A deal is a real time when the hour stays below 24 and
        // the minute below 60, and comparing survivors as minutes past
        // midnight picks the latest outright. The sentinel -1 means no
        // deal survived, so nothing beats it and the empty string is
        // returned.
        let mut best: i32 = -1;
        for i in 0..4 {
            for j in 0..4 {
                if j == i {
                    continue;
                }
                for k in 0..4 {
                    if k == i || k == j {
                        continue;
                    }
                    let l = 6 - i - j - k;
                    let hour = arr[i] * 10 + arr[j];
                    let minute = arr[k] * 10 + arr[l];
                    if hour < 24 && minute < 60 {
                        let total = hour * 60 + minute;
                        if total > best {
                            best = total;
                        }
                    }
                }
            }
        }
        if best < 0 {
            return String::new();
        }
        format!("{:02}:{:02}", best / 60, best % 60)
    }
}
