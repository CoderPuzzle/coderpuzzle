impl Solution {
    pub fn k_big_indices(nums: Vec<i32>, k: i32) -> i32 {
        // One merge sort over value/index pairs fills both tallies at once.
        // When a merge places a left-half element, every right-half element
        // already placed is strictly smaller than it; when it places a
        // right-half element, a crawl over the sorted left run counts its
        // strictly smaller predecessors. Each pair of positions is weighed
        // at exactly the one merge whose split separates it, so both counts
        // are complete when the sort ends; equal values place left-first and
        // are never credited. A position is k-big exactly when both counts
        // reach k.
        let n = nums.len();
        let mut left_counts = vec![0i32; n];
        let mut right_counts = vec![0i32; n];
        let mut order: Vec<usize> = (0..n).collect(); // merge-sort workspace of indexes, ordered by value

        // Merge-sorts order[lo:hi) by value while filling both tallies:
        // each left-half placement is credited the right-half values
        // already placed below it, and each right-half placement reads its
        // strictly smaller left-half predecessors off the sorted run.
        fn merge_sort(
            nums: &[i32],
            order: &mut [usize],
            left_counts: &mut [i32],
            right_counts: &mut [i32],
            lo: usize,
            hi: usize,
        ) {
            if hi - lo < 2 {
                return;
            }
            let mid = (lo + hi) / 2;
            merge_sort(nums, order, left_counts, right_counts, lo, mid);
            merge_sort(nums, order, left_counts, right_counts, mid, hi);
            let left: Vec<usize> = order[lo..mid].to_vec();
            let (mut i, mut j, mut w, mut s) = (0, mid, lo, 0);
            while i < left.len() && j < hi {
                if nums[left[i]] <= nums[order[j]] {
                    // equal: the left element places first, uncounted
                    right_counts[left[i]] += (j - mid) as i32; // right-half values already placed below it
                    order[w] = left[i];
                    i += 1;
                } else {
                    while s < left.len() && nums[left[s]] < nums[order[j]] {
                        s += 1;
                    }
                    left_counts[order[j]] += s as i32; // left-half values strictly below it
                    order[w] = order[j];
                    j += 1;
                }
                w += 1;
            }
            while i < left.len() {
                right_counts[left[i]] += (j - mid) as i32; // the whole right half sits below it
                order[w] = left[i];
                i += 1;
                w += 1;
            }
            while j < hi {
                while s < left.len() && nums[left[s]] < nums[order[j]] {
                    s += 1;
                }
                left_counts[order[j]] += s as i32;
                order[w] = order[j];
                j += 1;
                w += 1;
            }
        }
        merge_sort(&nums, &mut order, &mut left_counts, &mut right_counts, 0, n);
        let mut big = 0;
        for i in 0..n {
            if left_counts[i] >= k && right_counts[i] >= k {
                big += 1;
            }
        }
        big
    }
}
