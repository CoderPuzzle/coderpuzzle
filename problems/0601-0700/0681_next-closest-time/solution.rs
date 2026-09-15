impl Solution {
    pub fn next_closest_time(time: String) -> String {
        // A candidate may reuse only digits already on the clock, so at
        // most 4^4 = 256 four-digit drawings cover everything. Keep the
        // drawings that are real clock times (hour < 24, minute < 60) and
        // pick the one whose wrapped lead over the input, (candidate -
        // input) mod 1440, is smallest. Seeding the answer with the input
        // itself at a full day's lead is the wrap: 23:59 comes around to
        // 22:22, 11:11 to itself.
        let time = time.as_bytes();
        let mut present = [false; 10];
        for (i, &c) in time.iter().enumerate() {
            if i != 2 {
                present[(c - b'0') as usize] = true;
            }
        }
        let digits: Vec<u32> = (0..10).filter(|&d| present[d as usize]).collect();
        let start = ((time[0] - b'0') as i32 * 10 + (time[1] - b'0') as i32) * 60;
        let start = start + (time[3] - b'0') as i32 * 10 + (time[4] - b'0') as i32;
        let (mut best, mut best_gap) = (start, 1440);
        for &h1 in &digits {
            for &h2 in &digits {
                let hour = h1 * 10 + h2;
                if hour >= 24 {
                    continue;
                }
                for &m1 in &digits {
                    for &m2 in &digits {
                        let minute = m1 * 10 + m2;
                        if minute >= 60 {
                            continue;
                        }
                        let total = (hour * 60 + minute) as i32;
                        let gap = (total - start + 1440) % 1440;
                        if gap > 0 && gap < best_gap {
                            best_gap = gap;
                            best = total;
                        }
                    }
                }
            }
        }
        format!("{:02}:{:02}", best / 60, best % 60)
    }
}
