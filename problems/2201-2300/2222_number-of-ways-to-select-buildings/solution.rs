impl Solution {
    pub fn number_of_ways(s: String) -> i64 {
        let bytes = s.as_bytes();
        let (mut zeros, mut ones, mut seq01, mut seq10, mut total) = (0i64, 0i64, 0i64, 0i64, 0i64);
        for &b in bytes {
            if b == b'0' {
                total += seq10;
                seq01 += ones;
                zeros += 1;
            } else {
                total += seq01;
                seq10 += zeros;
                ones += 1;
            }
        }
        total
    }
}
