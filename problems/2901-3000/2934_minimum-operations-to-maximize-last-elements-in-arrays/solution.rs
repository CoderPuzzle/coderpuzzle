impl Solution {
    pub fn min_operations(nums1: Vec<i32>, nums2: Vec<i32>) -> i32 {
        // Two fates for the last column: untouched, or swapped once (which
        // exchanges the two targets). For fixed targets every earlier index
        // is independent: keep the pair if it already fits, else swap it if
        // it fits crossed, else the fate is dead.
        let keep = cost(&nums1, &nums2, true);
        let swap = cost(&nums1, &nums2, false);
        if keep == -1 && swap == -1 {
            return -1;
        }
        if keep == -1 {
            return swap;
        }
        if swap == -1 {
            return keep;
        }
        keep.min(swap)
    }
}

fn cost(nums1: &[i32], nums2: &[i32], keep_last: bool) -> i32 {
    let n = nums1.len();
    let (top1, top2) = if keep_last {
        (nums1[n - 1], nums2[n - 1])
    } else {
        (nums2[n - 1], nums1[n - 1])
    };
    let mut ops = if keep_last { 0 } else { 1 };
    for i in 0..n - 1 {
        let (a, b) = (nums1[i], nums2[i]);
        if a <= top1 && b <= top2 {
            continue;
        }
        if b <= top1 && a <= top2 {
            ops += 1;
        } else {
            return -1;
        }
    }
    ops
}
