impl Solution {
    pub fn good_triplets(nums1: Vec<i32>, nums2: Vec<i32>) -> i64 {
        let n = nums1.len();
        let mut pos2 = vec![0usize; n];
        for (i, &value) in nums2.iter().enumerate() {
            pos2[value as usize] = i;
        }

        let mut tree = vec![0i64; n + 1]; // Fenwick tree over positions in nums2
        fn add(tree: &mut Vec<i64>, n: usize, mut i: usize, delta: i64) {
            i += 1;
            while i <= n {
                tree[i] += delta;
                i += i & i.wrapping_neg();
            }
        }
        // Sum over indices 0..i inclusive; returns 0 when i < 0 (usize wraparound guarded).
        fn prefix_sum(tree: &Vec<i64>, mut i: i64) -> i64 {
            if i < 0 {
                return 0;
            }
            i += 1;
            let mut total: i64 = 0;
            while i > 0 {
                total += tree[i as usize];
                i -= i & i.wrapping_neg();
            }
            total
        }

        let mut answer: i64 = 0;
        for (i, &value) in nums1.iter().enumerate() {
            let p = pos2[value as usize];
            let left = prefix_sum(&tree, p as i64 - 1); // values before value in nums1 and in nums2
                                                        // values after value in both arrays
            let right = (n as i64 - 1 - p as i64) - (i as i64 - left);
            answer += left * right;
            add(&mut tree, n, p, 1);
        }
        answer
    }
}
