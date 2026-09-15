impl Solution {
    pub fn monotone_increasing_digits(n: i32) -> i32 {
        // Keep the non-decreasing prefix, then repair at the first position
        // where a digit exceeds its right neighbor: slide left across the
        // plateau of equals around that digit, decrement its first member,
        // and fill the rest with nines. No break means n already qualifies.
        let mut s: Vec<u8> = n.to_string().into_bytes();
        let d = s.len();
        let mut i = 0;
        while i + 1 < d && s[i] <= s[i + 1] {
            i += 1;
        }
        if i + 1 == d {
            return n;
        }
        while i > 0 && s[i - 1] == s[i] {
            i -= 1;
        }
        s[i] -= 1;
        for k in i + 1..d {
            s[k] = b'9';
        }
        String::from_utf8(s).unwrap().parse().unwrap()
    }
}
