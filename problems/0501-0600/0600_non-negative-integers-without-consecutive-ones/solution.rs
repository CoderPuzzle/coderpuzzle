impl Solution {
    pub fn find_integers(n: i32) -> i32 {
        let s = format!("{:b}", n);
        let m = s.len();
        // fib[i] = number of binary strings of length i with no consecutive 1s
        let mut fib = vec![0i64; m + 2];
        fib[0] = 1;
        fib[1] = 2;
        for i in 2..=m {
            fib[i] = fib[i - 1] + fib[i - 2];
        }
        let bytes = s.as_bytes();
        let mut res: i64 = 0;
        for i in 0..m {
            if bytes[i] == b'1' {
                // place 0 here, suffix can be anything without consecutive ones
                res += fib[m - i - 1];
                if i > 0 && bytes[i - 1] == b'1' {
                    // n itself already contains consecutive ones; stop counting
                    return res as i32;
                }
            }
        }
        (res + 1) as i32 // count n itself (its binary has no consecutive ones)
    }
}
