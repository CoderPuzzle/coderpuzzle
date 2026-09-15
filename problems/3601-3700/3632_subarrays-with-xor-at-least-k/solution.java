import java.util.Arrays;

class Solution {

    public long countXorSubarrays(int[] nums, int k) {
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
        // hence long.
        int n = nums.length;
        int[] child0 = new int[(n + 1) * 30 + 1];
        int[] child1 = new int[(n + 1) * 30 + 1];
        int[] cnt = new int[(n + 1) * 30 + 1];
        int nodes = 1;
        long ans = 0;
        int p = 0;
        for (int j = 0; j <= n; j++) {
            if (j > 0) {
                p ^= nums[j - 1];
            }
            int node = 0;
            for (int t = 29; t >= 0; t--) {
                int bit = (p >>> t) & 1;
                if (bit == 0) {
                    if (child0[node] == 0) {
                        child0[node] = nodes++;
                    }
                    node = child0[node];
                } else {
                    if (child1[node] == 0) {
                        child1[node] = nodes++;
                    }
                    node = child1[node];
                }
                cnt[node]++;
            }
            node = 0;
            boolean matched = true;
            for (int t = 29; t >= 0; t--) {
                int bit = (p >>> t) & 1;
                int flip = bit == 0 ? child1[node] : child0[node];
                if (((k >>> t) & 1) == 1) {
                    if (flip == 0) {
                        matched = false;
                        break;
                    }
                    node = flip;
                } else {
                    if (flip != 0) {
                        ans += cnt[flip];
                    }
                    int same = bit == 0 ? child0[node] : child1[node];
                    if (same == 0) {
                        matched = false;
                        break;
                    }
                    node = same;
                }
            }
            if (matched) {
                ans += cnt[node];
            }
        }
        return ans - (k == 0 ? n + 1 : 0);
    }
}
