impl Solution {
    pub fn is_good_array(nums: Vec<i32>) -> bool {
        // Bézout: the reachable sums are exactly the multiples of the gcd,
        // so a sum of 1 exists iff the overall gcd is 1.
        let mut overall: i64 = 0;
        for &value in &nums {
            overall = gcd(overall, value as i64);
            if overall == 1 {
                return true;
            }
        }
        overall == 1
    }
}

fn gcd(mut a: i64, mut b: i64) -> i64 {
    while b != 0 {
        let t = a % b;
        a = b;
        b = t;
    }
    a
}
