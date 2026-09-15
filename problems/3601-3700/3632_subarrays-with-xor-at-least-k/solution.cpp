class Solution {
  public:
    long long countXorSubarrays(vector<int> &nums, int k) {
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
        // hence long long.
        int n = nums.size();
        vector<array<int, 3>> trie;
        trie.reserve((n + 1) * 30 + 1);
        trie.push_back({0, 0, 0}); // children, count
        long long ans = 0;
        int p = 0;
        for (int j = 0; j <= n; ++j) {
            if (j) {
                p ^= nums[j - 1];
            }
            int node = 0;
            for (int t = 29; t >= 0; --t) {
                int bit = (p >> t) & 1;
                if (trie[node][bit] == 0) {
                    trie[node][bit] = trie.size();
                    trie.push_back({0, 0, 0});
                }
                node = trie[node][bit];
                ++trie[node][2];
            }
            node = 0;
            bool matched = true;
            for (int t = 29; t >= 0; --t) {
                int bit = (p >> t) & 1;
                int flip = trie[node][bit ^ 1];
                if ((k >> t) & 1) {
                    if (flip == 0) {
                        matched = false;
                        break;
                    }
                    node = flip;
                } else {
                    if (flip != 0) {
                        ans += trie[flip][2];
                    }
                    int same = trie[node][bit];
                    if (same == 0) {
                        matched = false;
                        break;
                    }
                    node = same;
                }
            }
            if (matched) {
                ans += trie[node][2];
            }
        }
        return ans - (k == 0 ? n + 1 : 0);
    }
};
