impl Solution {
    pub fn advantage_count(nums1: Vec<i32>, nums2: Vec<i32>) -> Vec<i32> {
        let mut values = nums1.clone();
        values.sort_unstable();
        let size = values.len();
        let mut tree = vec![0i32; size + 1];

        fn update(tree: &mut [i32], size: usize, mut index: usize, delta: i32) {
            while index <= size {
                tree[index] += delta;
                index += index & index.wrapping_neg();
            }
        }
        fn prefix_count(tree: &[i32], mut index: usize) -> i32 {
            let mut total = 0;
            while index > 0 {
                total += tree[index];
                index -= index & index.wrapping_neg();
            }
            total
        }
        fn kth_smallest(tree: &[i32], size: usize, k: i32) -> usize {
            let mut index = 0usize;
            let mut remaining = k;
            let mut step = 1usize;
            while step < size {
                step <<= 1;
            }
            while step > 0 {
                let next = index + step;
                if next <= size && tree[next] < remaining {
                    index = next;
                    remaining -= tree[next];
                }
                step >>= 1;
            }
            index + 1
        }
        fn upper_bound(values: &[i32], value: i32) -> usize {
            let mut lo = 0usize;
            let mut hi = values.len();
            while lo < hi {
                let mid = (lo + hi) / 2;
                if values[mid] <= value {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            lo
        }

        for rank in 1..=size {
            update(&mut tree, size, rank, 1);
        }

        let mut result = Vec::with_capacity(nums2.len());
        for &value in &nums2 {
            let less_or_equal = prefix_count(&tree, upper_bound(&values, value));
            let mut rank = kth_smallest(&tree, size, less_or_equal + 1);
            if rank > size {
                rank = kth_smallest(&tree, size, 1);
            }
            update(&mut tree, size, rank, -1);
            result.push(values[rank - 1]);
        }
        result
    }
}
