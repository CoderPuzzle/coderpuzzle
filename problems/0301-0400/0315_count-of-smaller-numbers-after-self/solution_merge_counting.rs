impl Solution {
    pub fn count_smaller(nums: Vec<i32>) -> Vec<i32> {
        let n = nums.len();
        let mut result = vec![0i32; n]; // per index: strictly smaller values to its right
        let mut order: Vec<usize> = (0..n).collect(); // merge-sort workspace of indexes, ordered by value
        fn merge_sort(nums: &[i32], order: &mut Vec<usize>, result: &mut Vec<i32>, lo: usize, hi: usize) {
            if hi - lo < 2 {
                return;
            }
            let mid = (lo + hi) / 2;
            merge_sort(nums, order, result, lo, mid);
            merge_sort(nums, order, result, mid, hi);
            let left: Vec<usize> = order[lo..mid].to_vec();
            let (mut i, mut j, mut k) = (0, mid, lo);
            while i < left.len() && j < hi {
                if nums[left[i]] <= nums[order[j]] {
                    // equal: the left element places first, uncounted
                    result[left[i]] += (j - mid) as i32; // right-half values already placed below it
                    order[k] = left[i];
                    i += 1;
                } else {
                    order[k] = order[j];
                    j += 1;
                }
                k += 1;
            }
            while i < left.len() {
                result[left[i]] += (j - mid) as i32; // the whole right half sits below it
                order[k] = left[i];
                i += 1;
                k += 1;
            }
        }
        merge_sort(&nums, &mut order, &mut result, 0, n);
        result
    }
}
