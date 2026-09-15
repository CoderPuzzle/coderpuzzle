impl Solution {
    pub fn min_difference(nums: Vec<i32>, queries: Vec<Vec<i32>>) -> Vec<i32> {
        // With values capped at 100, a value is either present in a
        // range or not, and 100 prefix-count rows decide that in O(1):
        // row v holds the occurrence count of v over every prefix of
        // nums, so v appears in nums[l..r] exactly when its count rises
        // between l and r+1. A query then walks the value axis 1..100,
        // collects the values whose counts rise, and takes the smallest
        // gap between consecutive ones — present values arrive in
        // increasing order, and the minimum |a[i] - a[j]| over a set
        // always sits between value-adjacent elements. Fewer than two
        // rising rows means every element in the range matches, so the
        // answer is -1; with two or more the gap is at most 99, which
        // is what makes the untouched sentinel honest. The flat
        // 100 x (n+1) i32 vector is ~40 MB — inside the memory budget —
        // and every count fits 32-bit by construction.
        let n = nums.len();
        // pre[v * (n + 1) + i] = occurrences of value v in nums[0..i)
        let mut pre = vec![0i32; 101 * (n + 1)];
        for v in 1..=100 {
            let base = v * (n + 1);
            let mut run = 0i32;
            for i in 0..n {
                if nums[i] == v as i32 {
                    run += 1;
                }
                pre[base + i + 1] = run;
            }
        }
        let mut answer = Vec::with_capacity(queries.len());
        for query in &queries {
            let l = query[0] as usize;
            let r1 = query[1] as usize + 1;
            let mut prev: i32 = -1;
            let mut best: i32 = 100;
            for v in 1..=100 {
                let base = v * (n + 1);
                if pre[base + r1] != pre[base + l] {
                    let value = v as i32;
                    if prev >= 0 && value - prev < best {
                        best = value - prev;
                    }
                    prev = value;
                }
            }
            answer.push(if best < 100 { best } else { -1 });
        }
        answer
    }
}
