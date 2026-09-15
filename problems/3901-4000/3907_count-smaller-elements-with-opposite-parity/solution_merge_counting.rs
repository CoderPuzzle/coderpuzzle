impl Solution {
    pub fn count_smaller_opposite_parity(nums: Vec<i32>) -> Vec<i32> {
        let n = nums.len();
        let mut result = vec![0i32; n]; // per index: smaller opposite-parity values to its right
        let mut order: Vec<usize> = (0..n).collect(); // merge-sort workspace of indexes, ordered by value
        fn merge_sort(nums: &[i32], order: &mut Vec<usize>, result: &mut Vec<i32>, lo: usize, hi: usize) {
            if hi - lo < 2 {
                return;
            }
            let mid = (lo + hi) / 2;
            merge_sort(nums, order, result, lo, mid);
            merge_sort(nums, order, result, mid, hi);
            let left: Vec<usize> = order[lo..mid].to_vec();
            let mut placed = [0i32; 2]; // placed right-half values, split by parity
            let (mut i, mut j, mut k) = (0, mid, lo);
            while i < left.len() && j < hi {
                if nums[left[i]] <= nums[order[j]] {
                    // equal: the left element places first, uncounted
                    result[left[i]] += placed[1 - (nums[left[i]] & 1) as usize]; // opposite parity only
                    order[k] = left[i];
                    i += 1;
                } else {
                    placed[(nums[order[j]] & 1) as usize] += 1;
                    order[k] = order[j];
                    j += 1;
                }
                k += 1;
            }
            while i < left.len() {
                // every placed right-half value sits below the remaining left run
                result[left[i]] += placed[1 - (nums[left[i]] & 1) as usize];
                order[k] = left[i];
                i += 1;
                k += 1;
            }
        }
        merge_sort(&nums, &mut order, &mut result, 0, n);
        result
    }
}
