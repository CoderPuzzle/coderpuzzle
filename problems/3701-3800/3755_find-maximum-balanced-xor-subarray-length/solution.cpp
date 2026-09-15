class Solution {
  public:
    int maxBalancedSubarray(vector<int> &nums) {
        // Two prefixes pin a window down: a repeated prefix XOR cancels the
        // shared head (the window's own XOR is 0), and a repeated parity gap
        // (evens minus odds so far) means the window's even and odd counts
        // tie. Matching pairs therefore bracket a balanced, zero-XOR
        // subarray, and the earliest occurrence of each pair maximizes the
        // length read off it.
        //
        // The pair packs into one long long key: pxor < 2^30 and gap + n
        // lies in [0, 2n], so pxor * (2n + 1) + (gap + n) fits far below
        // 2^63.
        int n = nums.size();
        long long width = 2LL * n + 1;
        unordered_map<long long, int> first;
        first.reserve(n + 1);
        first[(long long)n] = -1;
        int pxor = 0;
        int gap = 0;
        int best = 0;
        for (int i = 0; i < n; i++) {
            int value = nums[i];
            pxor ^= value;
            gap += value % 2 == 0 ? 1 : -1;
            long long key = (long long)pxor * width + (gap + n);
            auto it = first.find(key);
            if (it == first.end()) {
                first[key] = i;
            } else if (i - it->second > best) {
                best = i - it->second;
            }
        }
        return best;
    }
};
