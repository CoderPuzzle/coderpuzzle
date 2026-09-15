class Solution {
  public:
    int maxProfit(vector<int> &inventory, int orders) {
        const long long MOD = 1000000007LL;
        vector<long long> inv;
        inv.reserve(inventory.size() + 1);
        for (int x : inventory) {
            inv.push_back(x);
        }
        sort(inv.begin(), inv.end(), greater<long long>());
        inv.push_back(0); // sentinel

        long long total = 0;
        long long remaining = orders;
        int i = 0;
        int n = inv.size();
        while (remaining > 0 && i < n - 1) {
            while (i + 1 < n - 1 && inv[i + 1] == inv[i]) {
                i += 1;
            }
            long long h = inv[i];
            long long low = inv[i + 1];         // next distinct level (or 0 sentinel)
            long long width = i + 1;            // colors currently at level h or above
            long long band = width * (h - low); // balls in the full band (low, h]
            if (remaining >= band) {
                // sell every ball valued low+1 .. h for each of the width colors
                total = (total + width * (h + low + 1) * (h - low) / 2) % MOD;
                remaining -= band;
                i += 1;
            } else {
                long long full = remaining / width;
                long long rem = remaining % width;
                long long top = h;
                long long bottom = h - full + 1;
                total = (total + width * (top + bottom) * full / 2) % MOD;
                total = (total + rem * (h - full)) % MOD;
                remaining = 0;
            }
        }
        return (int)total;
    }
};
