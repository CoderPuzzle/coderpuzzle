impl Solution {
    pub fn min_bitwise_array(nums: Vec<i32>) -> Vec<i32> {
        // a OR (a + 1) >= a + 1, so any solution for x satisfies a <= x - 1;
        // scanning candidates from 0 up, the first hit is the minimum. The
        // value a OR (a + 1) always ends in a 1 bit, hence odd, and the only
        // even prime is 2 — that entry scans to no candidate and reports -1.
        let mut ans = Vec::with_capacity(nums.len());
        for &x in &nums {
            let mut found = -1;
            for a in 0..x {
                if (a | (a + 1)) == x {
                    found = a;
                    break;
                }
            }
            ans.push(found);
        }
        ans
    }
}
