impl Solution {
    // Prefix-count reduction: occurrences in [low, high] = f(high) - f(low-1).
    pub fn digits_count(d: i32, low: i32, high: i32) -> i32 {
        (Self::count_up_to(d, high as i64) - Self::count_up_to(d, low as i64 - 1)) as i32
    }

    fn count_up_to(d: i32, n: i64) -> i64 {
        if n <= 0 {
            return 0;
        }
        let s = n.to_string();
        let bytes = s.as_bytes();
        let length = bytes.len();
        let d = d as i64;
        let mut total: i64 = 0;
        // Count, per digit position, the numbers <= n with d there:
        // n = high_part * 10^power + cur * 10^power + low_part.
        for i in 0..length {
            let high_part: i64 = if i > 0 { s[..i].parse().unwrap() } else { 0 };
            let cur = (bytes[i] - b'0') as i64;
            let low_part: i64 = if i + 1 < length { s[i + 1..].parse().unwrap() } else { 0 };
            let mut power: i64 = 1;
            for _ in 0..(length - 1 - i) {
                power *= 10;
            }
            if d == 0 {
                // Leading zeros are never written: skip a zero high part, and
                // the -1 forbids a leading zero on this position.
                if high_part >= 1 {
                    if cur > 0 {
                        total += high_part * power;
                    } else {
                        total += (high_part - 1) * power + low_part + 1;
                    }
                }
            } else {
                // cur > d: prefix-equal numbers may put anything below;
                // cur == d: only suffixes up to low_part still qualify.
                if cur > d {
                    total += (high_part + 1) * power;
                } else if cur == d {
                    total += high_part * power + low_part + 1;
                } else {
                    total += high_part * power;
                }
            }
        }
        total
    }
}
