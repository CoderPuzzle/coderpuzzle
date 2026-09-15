impl Solution {
    pub fn minimum_difference(nums: Vec<i32>) -> i32 {
        let half = nums.len() / 2;

        // Bucket each half's subset sums by how many elements produced them;
        // a half of length <= 15 keeps this at most 2^15 entries.
        let subset_sums_by_count = |arr: &[i32]| -> Vec<Vec<i64>> {
            let m = arr.len();
            let mut res: Vec<Vec<i64>> = vec![Vec::new(); m + 1];
            for mask in 0..(1usize << m) {
                let cnt = mask.count_ones() as usize;
                let mut total: i64 = 0;
                for i in 0..m {
                    if mask >> i & 1 == 1 {
                        total += arr[i] as i64;
                    }
                }
                res[cnt].push(total);
            }
            res
        };

        let a_sums = subset_sums_by_count(&nums[..half]);
        let b_sums = subset_sums_by_count(&nums[half..]);

        let total: i64 = nums.iter().map(|&v| v as i64).sum();

        // If the first half contributes c elements with sum a, the second half
        // must contribute exactly half-c elements with sum b — both sides then
        // have `half` elements and difference |total - 2(a+b)|.
        let mut ans: i64 = i64::MAX;
        for c in 0..=half {
            let mut bc = b_sums[half - c].clone();
            bc.sort_unstable();
            for &a in &a_sums[c] {
                // b >= total/2 - a  <=>  2*b >= total - 2*a (exact integers)
                let want = total - 2 * a;
                let (mut lo, mut hi) = (0usize, bc.len());
                while lo < hi {
                    let mid = (lo + hi) / 2;
                    if 2 * bc[mid] < want {
                        lo = mid + 1;
                    } else {
                        hi = mid;
                    }
                }
                // The closest b sits on one side of the insertion point — try both.
                let idx = lo;
                if idx < bc.len() {
                    let d = (total - 2 * (a + bc[idx])).abs();
                    if d < ans {
                        ans = d;
                    }
                }
                if idx > 0 {
                    let d = (total - 2 * (a + bc[idx - 1])).abs();
                    if d < ans {
                        ans = d;
                    }
                }
            }
        }
        ans as i32
    }
}
