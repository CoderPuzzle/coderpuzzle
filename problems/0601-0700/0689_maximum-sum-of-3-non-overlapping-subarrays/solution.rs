impl Solution {
    pub fn max_sum_of_three_subarrays(nums: Vec<i32>, k: i32) -> Vec<i32> {
        let k = k as usize;
        let n = nums.len();
        let m = n - k + 1;
        // Fixed length k reduces the search to picking starts: window[s] is
        // the sum of nums[s..s+k), and an answer is a triple (i, j, l) with
        // i + k <= j and j + k <= l maximizing window[i] + window[j] +
        // window[l].
        let mut window = vec![0i32; m];
        let mut total: i32 = nums[..k].iter().sum();
        window[0] = total;
        for s in 1..m {
            total += nums[s + k - 1] - nums[s - 1];
            window[s] = total;
        }
        // left[s]: largest window over starts [0..s], kept at the SMALLEST
        // index on ties; right[s]: the same over [s..m-1], built right to
        // left so a tie takes the newer, smaller index — each middle j
        // therefore pairs with the lexicographically best flanks available.
        let mut left = vec![0usize; m];
        for s in 1..m {
            left[s] = if window[left[s - 1]] >= window[s] {
                left[s - 1]
            } else {
                s
            };
        }
        let mut right = vec![0usize; m];
        right[m - 1] = m - 1;
        for s in (0..m - 1).rev() {
            right[s] = if window[s] >= window[right[s + 1]] {
                s
            } else {
                right[s + 1]
            };
        }
        // Strict improvement only, so the FIRST middle achieving the maximum
        // survives the sweep — which is the lexicographic rule: with j fixed
        // the flanks are independent, and mixing a smaller flank into a
        // smaller middle only ever produces a lexicographically smaller
        // optimum, so the global answer sits at the minimal middle. Every
        // window sum is at least k, so -1 sits below any real total.
        let mut best_total = -1i32;
        let mut best = vec![0i32; 3];
        for j in k..=n - 2 * k {
            let (i, l) = (left[j - k], right[j + k]);
            let total = window[i] + window[j] + window[l];
            if total > best_total {
                best_total = total;
                best = vec![i as i32, j as i32, l as i32];
            }
        }
        best
    }
}
