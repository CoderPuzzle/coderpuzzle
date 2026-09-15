impl Solution {
    pub fn count_ratio_subarrays(nums: Vec<i32>, a: i32, b: i32) -> i64 {
        let n = nums.len();
        // Transformed prefix sums reach 10^5 * 10^9 = 10^14 in magnitude,
        // and the answer reaches ~5 * 10^9, so both coordinates and the
        // Fenwick cells are 64-bit.
        let mut pref = vec![0i64; n + 1];
        for i in 0..n {
            pref[i + 1] = pref[i] + if nums[i] % 2 == 0 { b as i64 } else { -(a as i64) };
        }
        // Coordinate-compress the prefix values; duplicates share one slot
        // so that >= comparisons count them all.
        let mut sorted = pref.clone();
        sorted.sort_unstable();
        sorted.dedup();
        let size = sorted.len();
        let rank = |value: i64| -> usize { sorted.partition_point(|&x| x < value) + 1 };
        let mut tree = vec![0i64; size + 1];
        let mut answer = 0i64;
        update(&mut tree, size, rank(pref[0]));
        let mut seen = 1i64;
        for m in 1..=n {
            let r = rank(pref[m]);
            // Subarray [m-1, k] for every earlier l = k with
            // pref[m] <= pref[l]: everything seen minus what is strictly below.
            answer += seen - query(&tree, r - 1);
            update(&mut tree, size, r);
            seen += 1;
        }
        answer
    }
}

fn update(tree: &mut [i64], size: usize, mut i: usize) {
    while i <= size {
        tree[i] += 1;
        i += i & i.wrapping_neg();
    }
}

fn query(tree: &[i64], mut i: usize) -> i64 {
    let mut total = 0i64;
    while i > 0 {
        total += tree[i];
        i &= i.wrapping_sub(1); // clear lowest set bit
    }
    total
}
