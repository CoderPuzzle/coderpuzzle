class Solution {
  public:
    int maxTotalValue(vector<int> &value, vector<int> &decay, long long m) {
        const long long M = 1000000007, INV = 500000004;
        auto count = [&](long long g) {
            long long z = 0;
            for (int i = 0; i < value.size(); i++)
                if (value[i] >= g) {
                    z += (value[i] - g) / decay[i] + 1;
                    if (z > m)
                        z = m + 1;
                }
            return z;
        };
        auto total = [&](long long g) {
            long long z = 0;
            for (int i = 0; i < value.size(); i++)
                if (value[i] >= g) {
                    long long c = (value[i] - g) / decay[i] + 1;
                    z = (z + c % M * value[i] % M - decay[i] % M * (c % M) % M * ((c - 1) % M) % M * INV) % M;
                }
            return (z + M) % M;
        };
        if (count(1) <= m)
            return total(1);
        long long l = 1, r = *max_element(value.begin(), value.end());
        while (l < r) {
            long long x = (l + r + 1) / 2;
            if (count(x) >= m)
                l = x;
            else
                r = x - 1;
        }
        long long c = count(l + 1);
        return (total(l + 1) + (m - c) % M * (l % M)) % M;
    }
};
