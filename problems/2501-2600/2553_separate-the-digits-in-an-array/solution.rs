impl Solution {
    pub fn separate_digits(nums: Vec<i32>) -> Vec<i32> {
        // Strip each value's digits by division into a small buffer and
        // flush it reversed: numbers keep their reading order while digits
        // lift low-first. Values reach 10^5, so six slots suffice.
        let mut out: Vec<i32> = Vec::with_capacity(nums.len() * 6);
        let mut buf = [0i32; 6];
        for x in nums {
            let mut t = 0;
            let mut v = x;
            while v > 0 {
                buf[t] = v % 10;
                t += 1;
                v /= 10;
            }
            while t > 0 {
                t -= 1;
                out.push(buf[t]);
            }
        }
        out
    }
}
