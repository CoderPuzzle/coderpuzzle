use std::collections::HashMap;

impl Solution {
    pub fn max_sub_array_len(nums: Vec<i32>, k: i32) -> i32 {
        // Longest qualifying subarray inside nums[lo..hi]: recurse on each
        // half, then stitch the halves together.
        solve(&nums, k as i64, 0, nums.len() as i64 - 1)
    }
}

fn solve(nums: &Vec<i32>, k: i64, lo: i64, hi: i64) -> i32 {
    if lo > hi {
        return 0;
    }
    if lo == hi {
        return if nums[lo as usize] as i64 == k { 1 } else { 0 };
    }
    let mid = lo + (hi - lo) / 2;
    let mut best = solve(nums, k, lo, mid).max(solve(nums, k, mid + 1, hi));
    // A subarray crossing the midline is a suffix of the left half plus a
    // prefix of the right half. Record, per suffix sum, the longest suffix
    // that carries it — scanning away from the mid and overwriting keeps
    // the longest.
    let mut longest: HashMap<i64, i64> = HashMap::new();
    let mut total: i64 = 0;
    let mut i = mid;
    while i >= lo {
        total += nums[i as usize] as i64;
        longest.insert(total, mid - i + 1);
        i -= 1;
    }
    total = 0;
    for j in (mid + 1)..=hi {
        total += nums[j as usize] as i64;
        // The right prefix pins the sum the left suffix must supply.
        if let Some(&length) = longest.get(&(k - total)) {
            best = best.max((length + (j - mid)) as i32);
        }
    }
    best
}
