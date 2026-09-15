impl Solution {
    // Rotation replaces 0, 1, 8 by themselves and trades 2 with 5,
    // 6 with 9, so a candidate is good exactly when its decimal
    // writing holds no 3, 4, 7 — digits with no rotation — and at
    // least one of the four trading digits. Peeling digits off the
    // tail with %10 and /10 walks the writing from last digit to
    // first: an unrotatable digit vetoes the number on sight, a
    // trading digit promotes it, and only a walk ending with no veto
    // and a promotion lands in the count.
    pub fn rotated_digits(n: i32) -> i32 {
        let mut count = 0;
        for i in 1..=n {
            let (mut m, mut good) = (i, false);
            while m > 0 {
                let d = m % 10;
                if d == 3 || d == 4 || d == 7 {
                    good = false;
                    break;
                }
                if d == 2 || d == 5 || d == 6 || d == 9 {
                    good = true;
                }
                m /= 10;
            }
            if good {
                count += 1;
            }
        }
        count
    }
}
