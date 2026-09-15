// Read in increasing order, any replacement becomes a merge of the two
// arrays; replaying a merge hands each slot the smallest value above its
// predecessor with the slot's parity, so a step adds 1 when the bit
// differs from the previous bit and 2 when it repeats. dp[i][j][f] is the
// replay minimum after consuming i slots of nums1 and j of nums2 with the
// last value taken by array f; two rolling rows carry the table. Answers
// are <= 2*(n+m) <= 4000, so BIG sentinel arithmetic stays far from
// overflow.
impl Solution {
    pub fn min_largest(nums1: Vec<i32>, nums2: Vec<i32>) -> i32 {
        const BIG: i32 = 1 << 29;
        let n = nums1.len();
        let m = nums2.len();
        let mut prv0 = vec![BIG; m + 1];
        let mut prv1 = vec![BIG; m + 1];
        if m >= 1 {
            prv1[1] = 2 - nums2[0];
            for j in 2..=m {
                let step = if nums2[j - 2] != nums2[j - 1] { 1 } else { 2 };
                prv1[j] = prv1[j - 1] + step;
            }
        }
        for i in 1..=n {
            let x = nums1[i - 1];
            let step_x = if i >= 2 && nums1[i - 2] != x { 1 } else { 2 };
            let mut cur0 = vec![BIG; m + 1];
            let mut cur1 = vec![BIG; m + 1];
            cur0[0] = if i == 1 { 2 - x } else { prv0[0] + step_x };
            for j in 1..=m {
                let y = nums2[j - 1];
                cur0[j] = (prv0[j] + step_x).min(prv1[j] + if y != x { 1 } else { 2 });
                let mut best = cur0[j - 1] + if x != y { 1 } else { 2 };
                if j >= 2 {
                    best = best.min(cur1[j - 1] + if nums2[j - 2] != y { 1 } else { 2 });
                }
                cur1[j] = best;
            }
            prv0 = cur0;
            prv1 = cur1;
        }
        prv0[m].min(prv1[m])
    }
}
