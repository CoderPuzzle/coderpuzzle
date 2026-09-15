impl Solution {
    pub fn count_operations_to_empty_array(nums: Vec<i32>) -> i64 {
        let n = nums.len();
        if n == 0 {
            return 0;
        }

        fn add(tree: &mut Vec<i64>, n: usize, mut i: usize, delta: i64) {
            while i <= n {
                tree[i] += delta;
                i += i & i.wrapping_neg();
            }
        }

        fn prefix(tree: &Vec<i64>, mut i: usize) -> i64 {
            let mut s = 0i64;
            while i > 0 {
                s += tree[i];
                i -= i & i.wrapping_neg();
            }
            s
        }

        let mut top_bit = 1usize;
        while top_bit * 2 <= n {
            top_bit *= 2;
        }

        fn kth(tree: &Vec<i64>, n: usize, top_bit: usize, mut k: i64) -> usize {
            let mut idx = 0usize;
            let mut bit = top_bit;
            while bit > 0 {
                let nxt = idx + bit;
                if nxt <= n && tree[nxt] < k {
                    idx = nxt;
                    k -= tree[nxt];
                }
                bit /= 2;
            }
            idx + 1
        }

        let mut tree = vec![0i64; n + 1];
        for i in 1..=n {
            add(&mut tree, n, i, 1);
        }

        let mut order: Vec<usize> = (0..n).collect();
        order.sort_by_key(|&i| nums[i]);

        let mut ops: i64 = 0;
        let mut cur: usize = 1;
        let mut removed: usize = 0;
        for &idx in &order {
            let pos = idx + 1;
            if pos >= cur {
                ops += prefix(&tree, pos) - prefix(&tree, cur - 1);
            } else {
                ops += prefix(&tree, n) - prefix(&tree, cur - 1) + prefix(&tree, pos);
            }
            add(&mut tree, n, pos, -1);
            removed += 1;
            let remaining = n - removed;
            if remaining > 0 {
                let rank_after = prefix(&tree, pos);
                let next_rank = (rank_after % (remaining as i64)) + 1;
                cur = kth(&tree, n, top_bit, next_rank);
            }
        }
        ops
    }
}
