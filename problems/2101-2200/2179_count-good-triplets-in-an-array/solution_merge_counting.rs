impl Solution {
    pub fn good_triplets(nums1: Vec<i32>, nums2: Vec<i32>) -> i64 {
        let n = nums1.len();
        let mut pos2 = vec![0usize; n];
        for (i, &value) in nums2.iter().enumerate() {
            pos2[value as usize] = i;
        }
        let mut a = vec![0usize; n]; // a[i] = position of nums1[i] in nums2
        for (i, &value) in nums1.iter().enumerate() {
            a[i] = pos2[value as usize];
        }

        let mut smaller_after = vec![0i64; n]; // per index: later nums1 values that precede it in nums2
        let mut order: Vec<usize> = (0..n).collect(); // merge-sort workspace of indexes, ordered by nums2 position
        fn merge_sort(a: &[usize], order: &mut Vec<usize>, smaller_after: &mut Vec<i64>, lo: usize, hi: usize) {
            if hi - lo < 2 {
                return;
            }
            let mid = (lo + hi) / 2;
            merge_sort(a, order, smaller_after, lo, mid);
            merge_sort(a, order, smaller_after, mid, hi);
            let left: Vec<usize> = order[lo..mid].to_vec();
            let (mut i, mut j, mut k) = (0, mid, lo);
            while i < left.len() && j < hi {
                if a[left[i]] < a[order[j]] {
                    smaller_after[left[i]] += (j - mid) as i64; // right-half values already placed below it
                    order[k] = left[i];
                    i += 1;
                } else {
                    order[k] = order[j];
                    j += 1;
                }
                k += 1;
            }
            while i < left.len() {
                smaller_after[left[i]] += (j - mid) as i64; // the whole right half sits below it
                order[k] = left[i];
                i += 1;
                k += 1;
            }
        }
        merge_sort(&a, &mut order, &mut smaller_after, 0, n);

        let mut answer: i64 = 0;
        for i in 0..n {
            let left = a[i] as i64 - smaller_after[i]; // values before value in nums1 and in nums2
                                                       // values after value in both arrays
            let right = (n as i64 - 1 - i as i64) - smaller_after[i];
            answer += left * right;
        }
        answer
    }
}
