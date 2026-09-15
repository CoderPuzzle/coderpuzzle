impl Solution {
    pub fn count_range_sum(nums: Vec<i32>, lower: i32, upper: i32) -> i32 {
        let n = nums.len();
        // Range sums become pairs: count i < j with
        // prefix[j] - prefix[i] in [lower, upper] (leading 0 included).
        let mut prefix: Vec<i64> = vec![0; n + 1];
        for i in 0..n {
            prefix[i + 1] = prefix[i] + nums[i] as i64;
        }
        let lower = lower as i64;
        let upper = upper as i64;
        merge_count(&mut prefix, 0, n, lower, upper) as i32
    }
}

fn merge_count(prefix: &mut Vec<i64>, lo: usize, hi: usize, lower: i64, upper: i64) -> i64 {
    if lo >= hi {
        return 0;
    }
    let mid = lo + (hi - lo) / 2;
    // Pairs inside each half first; cross pairs next.
    let mut count = merge_count(prefix, lo, mid, lower, upper) + merge_count(prefix, mid + 1, hi, lower, upper);

    // Left half is sorted, so for each left prefix the valid right
    // entries form the window [l, r): l skips below-lower, r passes
    // at-most-upper; both pointers only ever move forward.
    let mut l = mid + 1;
    let mut r = mid + 1;
    for i in lo..=mid {
        while l <= hi && prefix[l] - prefix[i] < lower {
            l += 1;
        }
        while r <= hi && prefix[r] - prefix[i] <= upper {
            r += 1;
        }
        count += (r - l) as i64;
    }

    // Standard merge re-sorts the range, restoring the invariant
    // the parent level relies on.
    let mut merged: Vec<i64> = Vec::with_capacity(hi - lo + 1);
    let (mut i, mut j) = (lo, mid + 1);
    while i <= mid && j <= hi {
        if prefix[i] <= prefix[j] {
            merged.push(prefix[i]);
            i += 1;
        } else {
            merged.push(prefix[j]);
            j += 1;
        }
    }
    while i <= mid {
        merged.push(prefix[i]);
        i += 1;
    }
    while j <= hi {
        merged.push(prefix[j]);
        j += 1;
    }
    prefix[lo..=hi].copy_from_slice(&merged);
    count
}
