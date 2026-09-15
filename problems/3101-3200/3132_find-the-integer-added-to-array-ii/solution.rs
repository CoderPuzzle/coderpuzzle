impl Solution {
    pub fn minimum_added_integer(nums1: Vec<i32>, nums2: Vec<i32>) -> i32 {
        // Sorted correspondence forces x = min(nums2) - keptMin, and two
        // removals leave the kept minimum at sorted index <= 2, so only the
        // three candidates nums2min - sorted(nums1)[r] for r in {0,1,2} can
        // work. Each candidate is validated by consuming a count of nums1
        // against every nums2 element minus x; the smallest survivor wins.
        use std::collections::HashMap;
        let mut sa = nums1.clone();
        sa.sort();
        let lo_b = *nums2.iter().min().unwrap();
        let mut best: Option<i32> = None;
        for r in 0..3 {
            let x = lo_b - sa[r];
            let mut pool: HashMap<i32, i32> = HashMap::new();
            for &v in &nums1 {
                *pool.entry(v).or_insert(0) += 1;
            }
            let mut ok = true;
            for &v in &nums2 {
                let need = v - x;
                match pool.get_mut(&need) {
                    Some(c) if *c > 0 => *c -= 1,
                    _ => {
                        ok = false;
                        break;
                    }
                }
            }
            if ok && best.map_or(true, |b| x < b) {
                best = Some(x);
            }
        }
        best.unwrap()
    }
}
