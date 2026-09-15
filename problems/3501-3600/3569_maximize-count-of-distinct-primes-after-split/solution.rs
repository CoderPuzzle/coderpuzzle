use std::collections::HashMap;

impl Solution {
    // A prime counts on both sides of a split at k exactly when k lies in
    // [first + 1, last] of its occurrence indices, so every query answer is
    // (distinct primes present) + (deepest interval overlap). Each prime
    // value keeps a sorted list of its occurrence indices, and an interval
    // entering or leaving is two point updates in a max-prefix segment tree
    // over the split positions (+1 at first+1, -1 at last+1): the root
    // stores the largest prefix sum of the event array, i.e. the best
    // overlap, and the update work per query is a constant number of
    // interval insertions and removals.
    pub fn maximum_count(nums: Vec<i32>, queries: Vec<Vec<i32>>) -> Vec<i32> {
        const LIMIT: usize = 100001;
        let mut is_prime = vec![true; LIMIT];
        is_prime[0] = false;
        is_prime[1] = false;
        let mut i = 2;
        while i * i < LIMIT {
            if is_prime[i] {
                let mut j = i * i;
                while j < LIMIT {
                    is_prime[j] = false;
                    j += i;
                }
            }
            i += 1;
        }
        fn add_event(seg_sum: &mut [i32], seg_best: &mut [i32], size: usize, pos: usize, delta: i32) {
            let mut u = size + pos - 1;
            seg_sum[u] += delta;
            seg_best[u] = if seg_sum[u] > 0 { seg_sum[u] } else { 0 };
            u >>= 1;
            while u > 0 {
                let left = u + u;
                seg_sum[u] = seg_sum[left] + seg_sum[left + 1];
                let cross = seg_sum[left] + seg_best[left + 1];
                seg_best[u] = if cross > seg_best[left] { cross } else { seg_best[left] };
                u >>= 1;
            }
        }
        fn events(seg_sum: &mut [i32], seg_best: &mut [i32], size: usize, lst: &[usize], sign: i32) {
            add_event(seg_sum, seg_best, size, lst[0] + 1, sign);
            add_event(seg_sum, seg_best, size, lst[lst.len() - 1] + 1, -sign);
        }
        let n = nums.len();
        let mut size = 1usize;
        while size < n {
            size <<= 1;
        }
        let mut seg_sum = vec![0i32; 2 * size];
        let mut seg_best = vec![0i32; 2 * size];
        let mut cur = nums.clone();
        let mut occ: HashMap<i32, Vec<usize>> = HashMap::new();
        let mut distinct = 0i32;
        for i in 0..n {
            let v = cur[i];
            if is_prime[v as usize] {
                let entry = occ.entry(v).or_default();
                if entry.is_empty() {
                    distinct += 1;
                }
                entry.push(i);
            }
        }
        for idxs in occ.values() {
            if idxs.len() >= 2 {
                events(&mut seg_sum, &mut seg_best, size, idxs, 1);
            }
        }
        let mut answers: Vec<i32> = Vec::with_capacity(queries.len());
        for q in &queries {
            let idx = q[0] as usize;
            let val = q[1];
            let old = cur[idx];
            if old != val {
                if is_prime[old as usize] {
                    let lst = occ.get_mut(&old).unwrap();
                    if lst.len() >= 2 {
                        events(&mut seg_sum, &mut seg_best, size, lst, -1);
                    }
                    let at = lst.binary_search(&idx).unwrap_or_else(|x| x);
                    lst.remove(at);
                    if lst.is_empty() {
                        occ.remove(&old);
                        distinct -= 1;
                    } else if lst.len() >= 2 {
                        events(&mut seg_sum, &mut seg_best, size, lst, 1);
                    }
                }
                if is_prime[val as usize] {
                    if occ.contains_key(&val) {
                        let lst = occ.get_mut(&val).unwrap();
                        if lst.len() >= 2 {
                            events(&mut seg_sum, &mut seg_best, size, lst, -1);
                        }
                    }
                    let lst = occ.entry(val).or_default();
                    let at = lst.binary_search(&idx).unwrap_or_else(|x| x);
                    lst.insert(at, idx);
                    if lst.len() >= 2 {
                        events(&mut seg_sum, &mut seg_best, size, lst, 1);
                    } else {
                        distinct += 1;
                    }
                }
                cur[idx] = val;
            }
            answers.push(distinct + seg_best[1]);
        }
        answers
    }
}
