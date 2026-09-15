impl Solution {
    pub fn result_array(nums: Vec<i32>, k: i32, queries: Vec<Vec<i32>>) -> Vec<i32> {
        // After the update and the forced prefix removal, the operation
        // picks nums[start..j], so a query counts j >= start whose product
        // from start is x mod k. Each segment tree node stores the counts
        // of its segment's prefix products plus the segment product;
        // merging prepends the left product to the right child's counts,
        // and the suffix query merges the decomposition of nums[start..]
        // left to right while carrying the running product. Every stored
        // value is below k <= 5 and every count below n, so i32 suffices.
        let n = nums.len();
        let k = k as usize;
        let mut size = 1_usize;
        while size < n {
            size <<= 1;
        }
        let mut cnt = vec![0_i32; 2 * size * k];
        let mut prod = vec![1_i32; 2 * size];
        for (i, v) in nums.iter().enumerate() {
            prod[size + i] = v % k as i32;
            cnt[(size + i) * k + (*v % k as i32) as usize] = 1;
        }
        for u in (1..size).rev() {
            merge(&mut cnt, &mut prod, u, k);
        }
        let mut result = Vec::with_capacity(queries.len());
        for query in &queries {
            let (index, value, start, x) = (query[0], query[1], query[2], query[3]);
            let leaf = size + index as usize;
            let row = leaf * k;
            for r in 0..k {
                cnt[row + r] = 0;
            }
            cnt[row + (value % k as i32) as usize] = 1;
            prod[leaf] = value % k as i32;
            let mut u = leaf >> 1;
            while u >= 1 {
                merge(&mut cnt, &mut prod, u, k);
                u >>= 1;
            }
            let (mut lo, mut hi) = (size + start as usize, 2 * size);
            let mut cur = vec![0_i32; k];
            let mut running = 1_i32;
            while lo < hi {
                if lo & 1 == 1 {
                    let base = lo * k;
                    for p in 0..k {
                        let c = cnt[base + p];
                        if c != 0 {
                            cur[(running * p as i32 % k as i32) as usize] += c;
                        }
                    }
                    running = running * prod[lo] % k as i32;
                    lo += 1;
                }
                lo >>= 1;
                hi >>= 1;
            }
            result.push(cur[x as usize]);
        }
        result
    }
}

fn merge(cnt: &mut [i32], prod: &mut [i32], u: usize, k: usize) {
    let base = u * k;
    let lrow = 2 * u * k;
    let rrow = lrow + k;
    cnt.copy_within(lrow..lrow + k, base);
    let lp = prod[u + u];
    for p in 0..k {
        let c = cnt[rrow + p];
        if c != 0 {
            cnt[base + (lp * p as i32 % k as i32) as usize] += c;
        }
    }
    prod[u] = lp * prod[u + u + 1] % k as i32;
}
