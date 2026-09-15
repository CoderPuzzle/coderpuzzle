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
    pub fn count_elements(mut nums: Vec<i32>, k: i32) -> i32 {
        // The full sorted order is more than the answer needs: the count
        // is decided entirely by which values sit strictly below
        // sorted[n - k - 1]. Quickselect learns that one threshold value
        // without paying to order everything else.
        let n = nums.len();
        let target = n - 1 - k as usize;
        let (mut lo, mut hi) = (0usize, n - 1);
        let mut rng = 0x2545F4914F6CDD1Du64;
        while lo < hi {
            // A uniformly random pivot defeats adversarial inputs: every
            // partition is expected to shrink the window by a constant
            // factor, so the total work stays linear instead of degrading
            // to quadratic on sorted arrays.
            let span = (hi - lo + 1) as u64;
            let r = lo + (splitmix64(&mut rng) % span) as usize;
            nums.swap(r, hi);
            let pivot = nums[hi];
            // Three-way (Dutch flag) split: values strictly below the
            // pivot move to the front block, values strictly above to the
            // back block, and the pivot's own run sits between them. A
            // run of equals leaves the window together, which is what
            // keeps heavily duplicated inputs fast.
            let (mut lt, mut i, mut gt) = (lo, lo, hi);
            while i <= gt {
                if nums[i] < pivot {
                    nums.swap(lt, i);
                    lt += 1;
                    i += 1;
                } else if nums[i] > pivot {
                    nums.swap(i, gt);
                    gt -= 1;
                } else {
                    i += 1;
                }
            }
            // [lo, lt-1] < pivot, [lt, gt] == pivot, [gt+1, hi] > pivot;
            // keep only the block still covering the target index.
            if target < lt {
                hi = lt - 1;
            } else if target > gt {
                lo = gt + 1;
            } else {
                break;
            }
        }
        let threshold = nums[target];
        // Elements strictly below the threshold qualify wholesale; the run
        // AT it qualifies only when its strictly-greater count reaches k.
        let less = nums.iter().filter(|&&v| v < threshold).count();
        let equal = nums.iter().filter(|&&v| v == threshold).count();
        if (n - less - equal) as i32 >= k {
            (less + equal) as i32
        } else {
            less as i32
        }
    }
}
