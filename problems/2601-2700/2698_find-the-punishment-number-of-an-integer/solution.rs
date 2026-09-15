impl Solution {
    pub fn punishment_number(n: i32) -> i32 {
        let mut total = 0;
        for i in 1..=n {
            let digits = (i * i).to_string();
            let length = digits.len();
            let mut found = false;
            for mask in 0..(1 << (length - 1)) {
                let mut sum: i32 = 0;
                let mut cur: i32 = 0;
                let mut pruned = false;
                for (k, ch) in digits.bytes().enumerate() {
                    cur = cur * 10 + (ch - b'0') as i32;
                    if (mask >> k) & 1 == 1 {
                        sum += cur;
                        cur = 0;
                        if sum > i {
                            pruned = true;
                            break;
                        }
                    }
                }
                if !pruned && sum + cur == i {
                    found = true;
                    break;
                }
            }
            if found {
                total += i * i;
            }
        }
        total
    }
}
