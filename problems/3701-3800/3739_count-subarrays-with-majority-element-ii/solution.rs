impl Solution {
    pub fn count_majority_subarrays(nums: Vec<i32>, target: i32) -> i64 {
        // A subarray holds target as its majority element exactly when
        // target outnumbers everything else in it, so score each element +1
        // when it equals target and -1 otherwise: the subarray qualifies
        // precisely when its score sum is positive. With pref[0] = 0 and
        // pref[k] = pref[k - 1] + the score of nums[k - 1], the task
        // becomes counting pairs i < j with pref[i] < pref[j].
        //
        // Sweep the prefixes with a Fenwick tree over the value range:
        // scores move the prefix one step either way, so every prefix lies
        // in [-n, n] and an offset maps it onto 1..2n + 1 with no
        // compression needed. Each position is queried before it is
        // inserted, which keeps i < j automatic; the strictness skips tied
        // prefixes — windows where target fills exactly half and does not
        // count as a majority. The answer reaches n(n + 1) / 2, past 32
        // bits at this n, so it accumulates in 64-bit width.
        let n = nums.len();
        let size = 2 * n + 1;
        let mut tree = vec![0i64; size + 1];
        // Seed the tree with pref[0] = 0, stored at index n + 1.
        let mut index = n + 1;
        while index <= size {
            tree[index] += 1;
            index += index & index.wrapping_neg();
        }
        let mut answer: i64 = 0;
        let mut pref: i64 = 0;
        for x in nums {
            pref += if x == target { 1 } else { -1 };
            // Earlier prefixes strictly below pref sit at indices <= pref+n.
            let mut index = (pref + n as i64) as usize;
            while index > 0 {
                answer += tree[index];
                index &= index - 1;
            }
            // Insert pref at index pref + n + 1.
            let mut index = (pref + n as i64) as usize + 1;
            while index <= size {
                tree[index] += 1;
                index += index & index.wrapping_neg();
            }
        }
        answer
    }
}
