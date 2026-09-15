impl Solution {
    pub fn minimum_time(hens: Vec<i32>, grains: Vec<i32>) -> i32 {
        // Binary search the answer T, checked by a greedy sweep. With both
        // arrays sorted, hens in ascending order eating contiguous grain
        // prefixes is optimal by an exchange argument. A hen at h covering
        // grains up to g needs L + R + min(L, R) seconds, where
        // L = max(0, h - leftmost) and R = max(0, rightmost - h): whichever
        // extreme the hen reaches second becomes the double-walked detour.
        let mut hens = hens;
        let mut grains = grains;
        hens.sort_unstable();
        grains.sort_unstable();
        let mut lo: i64 = 0;
        let mut hi: i64 = 2_000_000_000; // answer <= 1.5e9 since positions <= 1e9
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if Self::feasible(mid, &hens, &grains) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        lo as i32
    }

    // Segment costs widen to i64: left/right reach 1e9 each, so 2L+R can
    // brush past what a 32-bit product would comfortably hold.
    fn feasible(t: i64, hens: &[i32], grains: &[i32]) -> bool {
        let mut j = 0usize;
        for &h in hens {
            if j == grains.len() {
                break;
            }
            let left = (h - grains[j]).max(0) as i64;
            let mut k = j;
            while k < grains.len() {
                let right = ((grains[k] as i64) - (h as i64)).max(0);
                if (2 * left + right).min(left + 2 * right) > t {
                    break;
                }
                k += 1;
            }
            j = k;
        }
        j == grains.len()
    }
}
