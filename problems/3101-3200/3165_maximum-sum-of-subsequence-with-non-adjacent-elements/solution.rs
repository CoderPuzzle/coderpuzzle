impl Solution {
    const MOD: i64 = 1_000_000_007;
    // sentinel for impossible boundary states; clamped on every merge so
    // sentinel sums cannot cascade into overflow (all valid values have
    // magnitude <= ~5e12, far above HALF)
    const NEG: i64 = -(1i64 << 60);
    const HALF: i64 = Self::NEG / 2;

    // [m00, m01, m10, m11]: [i][j] with i = leftmost taken?, j = rightmost taken?
    fn leaf(x: i64) -> [i64; 4] {
        [0, Self::NEG, Self::NEG, x]
    }

    fn add_clamped(a: i64, b: i64) -> i64 {
        if a < Self::HALF || b < Self::HALF {
            return Self::NEG;
        }
        a + b
    }

    fn merge(left: [i64; 4], right: [i64; 4]) -> [i64; 4] {
        let mut out = [0i64; 4];
        for i in 0..2usize {
            for j in 0..2usize {
                let mut b = Self::NEG;
                for k in 0..2usize {
                    for l in 0..2usize {
                        if k == 1 && l == 1 {
                            continue;
                        }
                        let val = Self::add_clamped(left[i * 2 + k], right[l * 2 + j]);
                        if val > b {
                            b = val;
                        }
                    }
                }
                out[i * 2 + j] = b;
            }
        }
        out
    }

    fn build_rec(tree: &mut [[i64; 4]], node: usize, lo: usize, hi: usize, nums: &[i32]) {
        if hi - lo == 1 {
            tree[node] = Self::leaf(nums[lo] as i64);
            return;
        }
        let mid = (lo + hi) / 2;
        Self::build_rec(tree, node * 2, lo, mid, nums);
        Self::build_rec(tree, node * 2 + 1, mid, hi, nums);
        let left = tree[node * 2];
        let right = tree[node * 2 + 1];
        tree[node] = Self::merge(left, right);
    }

    fn update_rec(tree: &mut [[i64; 4]], node: usize, lo: usize, hi: usize, pos: usize, val: i64) {
        if hi - lo == 1 {
            tree[node] = Self::leaf(val);
            return;
        }
        let mid = (lo + hi) / 2;
        if pos < mid {
            Self::update_rec(tree, node * 2, lo, mid, pos, val);
        } else {
            Self::update_rec(tree, node * 2 + 1, mid, hi, pos, val);
        }
        let left = tree[node * 2];
        let right = tree[node * 2 + 1];
        tree[node] = Self::merge(left, right);
    }

    pub fn maximum_sum_subsequence(nums: Vec<i32>, queries: Vec<Vec<i32>>) -> i32 {
        let n = nums.len();
        let mut tree = vec![[0i64; 4]; 4 * n];
        Self::build_rec(&mut tree, 1, 0, n, &nums);
        let mut answer: i64 = 0;
        for q in &queries {
            Self::update_rec(&mut tree, 1, 0, n, q[0] as usize, q[1] as i64);
            let mut best = tree[1][0];
            for e in 1..4 {
                if tree[1][e] > best {
                    best = tree[1][e];
                }
            }
            answer = (answer + best) % Self::MOD;
        }
        answer as i32
    }
}
