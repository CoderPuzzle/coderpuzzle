impl Solution {
    pub fn maximum_segment_sum(nums: Vec<i32>, removeQueries: Vec<i32>) -> Vec<i64> {
        let n = nums.len();
        let mut parent: Vec<usize> = (0..n).collect();
        let mut ssum = vec![0i64; n];
        let mut active = vec![false; n];

        fn find(parent: &mut Vec<usize>, mut x: usize) -> usize {
            while parent[x] != x {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            x
        }

        // Reverse time: removals become activations, so the process only
        // ever merges segments. The leading 0 is the answer after the last
        // removal, where nothing remains; skip removeQueries[0] (all other
        // positions are still active at that point).
        let mut answer: Vec<i64> = Vec::with_capacity(n);
        answer.push(0);
        let mut best: i64 = 0;
        for qi in (1..removeQueries.len()).rev() {
            let i = removeQueries[qi] as usize;
            active[i] = true;
            ssum[i] = nums[i] as i64;
            // Merge with any active neighbor; the component total stays at
            // the new root, so ssum[find(i)] is the whole merged block.
            for j in [i.wrapping_sub(1), i + 1] {
                if j < n && active[j] {
                    let a = find(&mut parent, i);
                    let b = find(&mut parent, j);
                    if a != b {
                        parent[a] = b;
                        ssum[b] += ssum[a];
                    }
                }
            }
            // Segments only grow along the reversed timeline, so the running
            // max is monotone — one max per step, nothing to evict.
            let cur = ssum[find(&mut parent, i)];
            if cur > best {
                best = cur;
            }
            answer.push(best);
        }
        answer.reverse();
        answer
    }
}
