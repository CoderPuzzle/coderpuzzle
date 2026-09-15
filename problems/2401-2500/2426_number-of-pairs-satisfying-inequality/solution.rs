impl Solution {
    pub fn number_of_pairs(nums1: Vec<i32>, nums2: Vec<i32>, diff: i32) -> i64 {
        let n = nums1.len();
        let mut values: Vec<i64> = Vec::with_capacity(n);
        let mut lo = i64::MAX;
        let mut hi = i64::MIN;
        for i in 0..n {
            let v = nums1[i] as i64 - nums2[i] as i64;
            if v < lo {
                lo = v;
            }
            if v > hi {
                hi = v;
            }
            values.push(v);
        }
        let size = (hi - lo + 1) as usize;
        let mut tree = vec![0i64; size + 1];
        let mut count = 0i64;
        for &v in &values {
            let target = v + diff as i64;
            if target >= lo {
                let mut idx = (target.min(hi) - lo) as usize + 1;
                while idx > 0 {
                    count += tree[idx];
                    idx &= idx.wrapping_sub(1); // clear lowest set bit
                }
            }
            let mut idx = (v - lo) as usize + 1;
            while idx <= size {
                tree[idx] += 1;
                idx += idx & idx.wrapping_neg();
            }
        }
        count
    }
}
