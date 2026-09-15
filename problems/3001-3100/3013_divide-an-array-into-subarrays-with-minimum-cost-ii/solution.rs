impl Solution {
    pub fn minimum_cost(nums: Vec<i32>, k: i32, dist: i32) -> i64 {
        let n = nums.len();
        let target = (k - 2) as usize;
        let mut vals: Vec<i64> = nums.iter().map(|&v| v as i64).collect();
        vals.sort_unstable();
        vals.dedup();
        let m = vals.len();

        let pos_of = |v: i64| -> usize { vals.partition_point(|&x| x < v) };

        let mut count_bit = vec![0i64; m + 1];
        let mut sum_bit = vec![0i64; m + 1];

        fn fen_add(bit: &mut Vec<i64>, m: usize, index: usize, delta: i64) {
            let mut i = index + 1;
            while i <= m {
                bit[i] += delta;
                i += i & i.wrapping_neg();
            }
        }

        fn fen_prefix(bit: &Vec<i64>, m: usize, index: isize) -> i64 {
            // sum over [0, index]; index may be < 0
            if index < 0 {
                return 0;
            }
            let mut idx = index as usize;
            if idx >= m {
                idx = m - 1;
            }
            let mut i = idx + 1;
            let mut total: i64 = 0;
            while i > 0 {
                total += bit[i];
                i -= i & i.wrapping_neg();
            }
            total
        }

        // 0-based index of the target_k-th smallest element (target_k >= 1)
        fn kth(count_bit: &Vec<i64>, m: usize, target_k: usize) -> usize {
            let mut idx = 0usize;
            let mut bitmask = 1usize;
            while bitmask * 2 <= m {
                bitmask *= 2;
            }
            let mut remaining = target_k as i64;
            while bitmask > 0 {
                let nxt = idx + bitmask;
                if nxt <= m && count_bit[nxt] < remaining {
                    idx = nxt;
                    remaining -= count_bit[nxt];
                }
                bitmask /= 2;
            }
            idx
        }

        let mut ans: i64 = i64::MAX;

        let add_value = |count_bit: &mut Vec<i64>, sum_bit: &mut Vec<i64>, v: i64| {
            let j = pos_of(v);
            fen_add(count_bit, m, j, 1);
            fen_add(sum_bit, m, j, v);
        };
        let remove_value = |count_bit: &mut Vec<i64>, sum_bit: &mut Vec<i64>, v: i64| {
            let j = pos_of(v);
            fen_add(count_bit, m, j, -1);
            fen_add(sum_bit, m, j, -v);
        };

        let right0 = (1 + dist as usize).min(n - 1);
        for p in 2..=right0 {
            add_value(&mut count_bit, &mut sum_bit, nums[p] as i64);
        }

        for i1 in 1..n {
            let left = i1 + 1;
            let right = (i1 + dist as usize).min(n - 1);
            if right + 1 >= left + target {
                let idx = kth(&count_bit, m, target);
                let before = fen_prefix(&count_bit, m, idx as isize - 1);
                let sum_before = fen_prefix(&sum_bit, m, idx as isize - 1);
                let sum_k = sum_before + (target as i64 - before) * vals[idx];
                let cost = nums[0] as i64 + nums[i1] as i64 + sum_k;
                if cost < ans {
                    ans = cost;
                }
            }
            if left <= n - 1 {
                remove_value(&mut count_bit, &mut sum_bit, nums[left] as i64);
            }
            let new_right = i1 + 1 + dist as usize;
            if new_right <= n - 1 {
                add_value(&mut count_bit, &mut sum_bit, nums[new_right] as i64);
            }
        }
        ans
    }
}
