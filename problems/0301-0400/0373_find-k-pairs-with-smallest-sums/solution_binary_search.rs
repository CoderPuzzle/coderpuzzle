impl Solution {
    pub fn k_smallest_pairs(nums1: Vec<i32>, nums2: Vec<i32>, k: i32) -> Vec<Vec<i32>> {
        let m = nums1.len();
        let n = nums2.len();
        let k = k as usize;
        // How many pairs sum to at most s? Both arrays are sorted, so a
        // descending pointer into nums2 serves every nums1[i]: the bound
        // s - nums1[i] only falls as i rises, so the pointer never turns
        // back.
        let count_at_most = |s: i64| -> usize {
            let mut total: usize = 0;
            let mut j = n as i64 - 1;
            for &a in &nums1 {
                let bound = s - a as i64;
                while j >= 0 && nums2[j as usize] as i64 > bound {
                    j -= 1;
                }
                total += (j + 1) as usize;
            }
            total
        };
        // The k-th smallest sum is the least s with count_at_most(s) >= k.
        let mut lo: i64 = nums1[0] as i64 + nums2[0] as i64;
        let mut hi: i64 = nums1[m - 1] as i64 + nums2[n - 1] as i64;
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if count_at_most(mid) >= k {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        let threshold = lo;
        // Every pair strictly below the threshold makes the cut — there are
        // fewer than k of them by the minimality of the threshold.
        let mut below: Vec<(i64, usize, usize)> = Vec::new();
        let mut j = n as i64 - 1;
        for i in 0..m {
            let a = nums1[i] as i64;
            while j >= 0 && a + nums2[j as usize] as i64 >= threshold {
                j -= 1;
            }
            if j >= 0 {
                for jj in 0..=(j as usize) {
                    below.push((a + nums2[jj] as i64, i, jj));
                }
            }
        }
        below.sort_unstable();
        let mut result: Vec<Vec<i32>> = Vec::with_capacity(k);
        for &(_, i, jj) in &below {
            result.push(vec![nums1[i], nums2[jj]]);
        }
        // Top up with pairs exactly at the threshold, in (i, j) order —
        // the required tie-break among equal sums.
        let mut needed = k - result.len();
        for i in 0..m {
            if needed == 0 {
                break;
            }
            let target = threshold - nums1[i] as i64;
            // nums2 is sorted: the entries equal to target form one run.
            let lo_j = nums2.partition_point(|&v| (v as i64) < target);
            let hi_j = nums2.partition_point(|&v| (v as i64) <= target);
            for jj in lo_j..hi_j {
                if needed == 0 {
                    break;
                }
                result.push(vec![nums1[i], nums2[jj]]);
                needed -= 1;
            }
        }
        result
    }
}
