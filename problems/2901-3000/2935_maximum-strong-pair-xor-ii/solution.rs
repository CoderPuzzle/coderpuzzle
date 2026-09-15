impl Solution {
    pub fn maximum_strong_pair_xor(mut nums: Vec<i32>) -> i32 {
        // Sorted sweep with a sliding window [ceil(y/2), y]: a binary trie
        // over the 20 value bits, each node carrying a count of live window
        // values, answers "best XOR partner of y in the window" greedily.
        // The left pointer retires values whose doubling falls below y.
        nums.sort_unstable();
        const BITS: usize = 20; // nums[i] <= 2^20 - 1
        let mut child: Vec<[i32; 2]> = vec![[0, 0]];
        let mut cnt: Vec<i32> = vec![0];
        let mut best = 0;
        let mut left = 0usize;
        for &y in nums.iter() {
            // insert y
            let mut node = 0i32;
            for b in (0..BITS).rev() {
                let d = ((y >> b) & 1) as usize;
                let mut nxt = child[node as usize][d];
                if nxt == 0 {
                    child.push([0, 0]);
                    cnt.push(0);
                    nxt = (child.len() - 1) as i32;
                    child[node as usize][d] = nxt;
                }
                node = nxt;
                cnt[node as usize] += 1;
            }
            // retire x from the left while 2 * x < y
            while 2 * nums[left] < y {
                let x = nums[left];
                let mut node2 = 0i32;
                for b in (0..BITS).rev() {
                    node2 = child[node2 as usize][((x >> b) & 1) as usize];
                    cnt[node2 as usize] -= 1;
                }
                left += 1;
            }
            // query: prefer the opposite bit while that subtree is live
            let mut node3 = 0i32;
            let mut res = 0i32;
            for b in (0..BITS).rev() {
                let d = ((y >> b) & 1) as usize;
                let want = child[node3 as usize][d ^ 1];
                if want != 0 && cnt[want as usize] > 0 {
                    res |= 1 << b;
                    node3 = want;
                } else {
                    node3 = child[node3 as usize][d];
                }
            }
            best = best.max(res);
        }
        best
    }
}
