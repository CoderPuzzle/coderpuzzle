impl Solution {
    pub fn count_xor_subarrays(nums: Vec<i32>, k: i32) -> i64 {
        // Prefix XOR turns subarrays into pairs: nums[i..j) has XOR
        // P[i] ^ P[j], so the answer counts prefix pairs i < j whose XOR
        // reaches k. Each prefix is inserted into a binary trie and then
        // queried against everything now in it, counting every pair once
        // at its right endpoint — plus the n+1 self-pairs (XOR 0), which
        // only qualify when k = 0 and are subtracted at the end. At a
        // 0-bit of k every trie prefix taking the flipped branch already
        // exceeds k; at a 1-bit only the flipped branch can still reach
        // k. Falling out of the walk leaves prefixes matching all 30
        // bits, i.e. XOR == k, which still qualifies. 30 bits cover
        // every prefix: values are <= 10^9 < 2^30. Counts reach ~5e9,
        // hence i64.
        let n = nums.len();
        let max_nodes = (n + 1) * 30 + 1;
        let mut child0 = vec![0i32; max_nodes];
        let mut child1 = vec![0i32; max_nodes];
        let mut cnt = vec![0i32; max_nodes];
        let mut nodes = 1usize;
        let mut ans: i64 = 0;
        let mut p: i32 = 0;
        for j in 0..=n {
            if j > 0 {
                p ^= nums[j - 1];
            }
            let mut node = 0usize;
            for t in (0..30).rev() {
                let bit = ((p >> t) & 1) as usize;
                let child = if bit == 0 { &mut child0 } else { &mut child1 };
                if child[node] == 0 {
                    child[node] = nodes as i32;
                    nodes += 1;
                }
                node = child[node] as usize;
                cnt[node] += 1;
            }
            node = 0;
            let mut matched = true;
            for t in (0..30).rev() {
                let bit = ((p >> t) & 1) as usize;
                let flip = if bit == 0 { child1[node] } else { child0[node] };
                if (k >> t) & 1 == 1 {
                    if flip == 0 {
                        matched = false;
                        break;
                    }
                    node = flip as usize;
                } else {
                    if flip != 0 {
                        ans += cnt[flip as usize] as i64;
                    }
                    let same = if bit == 0 { child0[node] } else { child1[node] };
                    if same == 0 {
                        matched = false;
                        break;
                    }
                    node = same as usize;
                }
            }
            if matched {
                ans += cnt[node] as i64;
            }
        }
        if k == 0 {
            ans - (n as i64 + 1)
        } else {
            ans
        }
    }
}
