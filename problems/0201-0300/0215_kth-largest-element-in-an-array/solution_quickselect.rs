fn splitmix64(state: &mut u64) -> u64 {
    // std has no RNG: a tiny splitmix64 generator with a fixed seed
    // supplies the uniformly random pivots.
    *state = state.wrapping_add(0x9E3779B97F4A7C15);
    let mut z = *state;
    z = (z ^ (z >> 30)).wrapping_mul(0xBF58476D1CE4E5B9);
    z = (z ^ (z >> 27)).wrapping_mul(0x94D049BB133111EB);
    z ^ (z >> 31)
}

impl Solution {
    pub fn find_kth_largest(nums: Vec<i32>, k: i32) -> i32 {
        // The kth largest sits at index n - k of the ascending-sorted
        // array; quickselect homes in on that target index.
        let mut nums = nums;
        let target = nums.len() - k as usize;
        let (mut lo, mut hi) = (0usize, nums.len() - 1);
        let mut rng = 0x2545F4914F6CDD1Du64;
        while lo < hi {
            // A uniformly random pivot defeats adversarial inputs: every
            // partition is expected to shrink the range by a constant
            // factor, so the total work stays linear instead of
            // degrading to quadratic on sorted or all-equal arrays.
            let span = (hi - lo + 1) as u64;
            let r = lo + (splitmix64(&mut rng) % span) as usize;
            nums.swap(r, hi);
            let pivot = nums[hi];
            let mut store = lo;
            // Lomuto sweep: values strictly below the pivot land left of
            // `store`; duplicates ride the right side.
            for j in lo..hi {
                if nums[j] < pivot {
                    nums.swap(j, store);
                    store += 1;
                }
            }
            nums.swap(store, hi);
            // nums[store] is now in its final sorted position; keep only
            // the side that still contains the target index.
            if store == target {
                return nums[store];
            }
            if store < target {
                lo = store + 1;
            } else {
                hi = store - 1;
            }
        }
        nums[target]
    }
}
