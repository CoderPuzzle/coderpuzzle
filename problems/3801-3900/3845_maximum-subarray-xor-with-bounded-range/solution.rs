impl Solution {
    // Bounds: nums[i] < 2^15 and XOR never widens a value, so every prefix
    // xor, subarray value, and the answer stay below 2^15: 15 trie levels
    // (bit 14 down to bit 0) cover the universe.
    pub fn max_xor(nums: Vec<i32>, k: i32) -> i32 {
        let n = nums.len();
        let mut pref = vec![0i32; n + 1];
        for i in 0..n {
            pref[i + 1] = pref[i] ^ nums[i];
        }
        let size = 15 * n + 1;
        let mut child = vec![-1i32; 2 * size]; // children of node j: child[2j], child[2j+1]
        let mut cnt = vec![0i32; size];
        let mut nodes = 1i32; // next free node id; node 0 is the root
        let mut max_q: Vec<usize> = Vec::with_capacity(n); // max candidates, values decreasing
        let mut min_q: Vec<usize> = Vec::with_capacity(n); // min candidates, values increasing
        let (mut max_head, mut min_head) = (0usize, 0usize);
        let mut left = 0usize;
        let mut best = 0i32;
        for right in 0..n {
            let x = nums[right];
            while max_q.len() > max_head && nums[max_q[max_q.len() - 1]] <= x {
                max_q.pop();
            }
            max_q.push(right);
            while min_q.len() > min_head && nums[min_q[min_q.len() - 1]] >= x {
                min_q.pop();
            }
            min_q.push(right);
            // Valid starts are exactly [left, right]: shrink from the left
            // while the window spread exceeds k, retiring pref[left] from
            // the trie as each start index leaves. A single element has
            // spread 0 <= k, so the loop always stops.
            while nums[max_q[max_head]] - nums[min_q[min_head]] > k {
                if max_q[max_head] == left {
                    max_head += 1;
                }
                if min_q[min_head] == left {
                    min_head += 1;
                }
                let v = pref[left];
                let mut node = 0usize;
                cnt[0] -= 1;
                for b in (0..15).rev() {
                    node = child[2 * node + ((v >> b) & 1) as usize] as usize;
                    cnt[node] -= 1;
                }
                left += 1;
            }
            // Insert pref[right]: start index right becomes eligible.
            let v = pref[right];
            let mut node = 0usize;
            cnt[0] += 1;
            for b in (0..15).rev() {
                let slot = 2 * node + ((v >> b) & 1) as usize;
                let mut nxt = child[slot];
                if nxt < 0 {
                    nxt = nodes;
                    nodes += 1;
                    child[slot] = nxt;
                }
                node = nxt as usize;
                cnt[node] += 1;
            }
            // Best subarray ending at right: max pref[right+1] ^ pref[l]
            // over l in [left, right]. Greedy walk, preferring the child
            // whose bit differs from pref[right+1] (setting the result
            // bit) while that branch is alive (nonempty count).
            let q = pref[right + 1];
            let mut node = 0usize;
            let mut cur = 0i32;
            for b in (0..15).rev() {
                let d = (q >> b) & 1;
                let nxt = child[2 * node + (d ^ 1) as usize];
                if nxt >= 0 && cnt[nxt as usize] > 0 {
                    cur |= 1 << b;
                    node = nxt as usize;
                } else {
                    node = child[2 * node + d as usize] as usize;
                }
            }
            if cur > best {
                best = cur;
            }
        }
        best
    }
}
