class Solution {
  public:
    vector<int> missingRolls(vector<int> &rolls, int mean, int n) {
        long long observedSum = 0;
        for (int roll : rolls) {
            observedSum += roll;
        }

        long long totalCount = static_cast<long long>(rolls.size()) + n;
        long long required = static_cast<long long>(mean) * totalCount - observedSum;
        if (required < n || required > 6LL * n) {
            return {};
        }

        int base = static_cast<int>(required / n);
        int remainder = static_cast<int>(required % n);
        vector<int> missing(n, base);
        for (int i = 0; i < remainder; ++i) {
            ++missing[i];
        }
        return missing;
    }
};
