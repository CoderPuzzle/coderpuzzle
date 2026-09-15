// Equal values are interchangeable, so a permutation is decided by how many
// copies of each distinct value land at each step — collapse nums to
// distinct values with multiplicities, precompute which value pairs sum to
// a perfect square (pair sums reach 2 * 10^9, so the root must be an exact
// integer root, never a bare float), and depth-first search: extend a
// partial sequence only through adjacent values that are still in stock; a
// branch consuming all n elements is one squareful permutation.
impl Solution {
    pub fn num_squareful_perms(nums: Vec<i32>) -> i64 {
        let mut values = nums.clone();
        values.sort_unstable();
        values.dedup();
        let d = values.len();
        let mut counts = vec![0i64; d];
        for &x in &nums {
            counts[values.partition_point(|&v| v < x)] += 1;
        }
        let adj: Vec<Vec<bool>> = (0..d)
            .map(|i| (0..d).map(|j| is_square(values[i] as i64 + values[j] as i64)).collect())
            .collect();
        let mut answer = 0i64;
        for start in 0..d {
            counts[start] -= 1;
            answer += walk(&mut counts, &adj, start, nums.len() - 1);
            counts[start] += 1;
        }
        answer
    }
}

// A branch extends only through adjacent values that are still in stock; a
// sequence consuming all n elements is one squareful permutation.
fn walk(counts: &mut [i64], adj: &[Vec<bool>], prev: usize, left: usize) -> i64 {
    if left == 0 {
        return 1;
    }
    let mut total = 0;
    for j in 0..counts.len() {
        if counts[j] > 0 && adj[prev][j] {
            counts[j] -= 1;
            total += walk(counts, adj, j, left - 1);
            counts[j] += 1;
        }
    }
    total
}

// Exact square test: binary-search the floor root of s (a pair sum is at
// most 2 * 10^9, whose root is below 44722), then compare.
fn is_square(s: i64) -> bool {
    let (mut lo, mut hi) = (0i64, 44722i64);
    while lo < hi {
        let mid = (lo + hi + 1) / 2;
        if mid * mid <= s {
            lo = mid;
        } else {
            hi = mid - 1;
        }
    }
    lo * lo == s
}
