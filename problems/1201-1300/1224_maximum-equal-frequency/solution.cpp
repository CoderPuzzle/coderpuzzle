class Solution {
  public:
    int maxEqualFreq(vector<int> &nums) {
        unordered_map<int, int> count;
        unordered_map<int, int> freq;
        int best = 0;
        for (int n = 1; n <= (int)nums.size(); ++n) {
            int value = nums[n - 1];
            int before = count[value]++;
            if (before > 0 && --freq[before] == 0)
                freq.erase(before);
            ++freq[before + 1];

            // At most two frequency classes can ever be fixable.
            int a = -1, b = -1, classes = 0;
            for (const auto &[f, c] : freq) {
                if (c == 0)
                    continue;
                if (classes == 0)
                    a = f;
                else
                    b = f;
                ++classes;
                if (classes > 2)
                    break;
            }
            if (classes == 1) {
                if (a == 1 || freq[a] == 1)
                    best = n;
            } else if (classes == 2) {
                if (a > b)
                    swap(a, b);
                if (b == a + 1 && freq[b] == 1)
                    best = n;
                else if (a == 1 && freq[a] == 1 && 1 + (long long)b * freq[b] == n)
                    best = n;
            }
        }
        return best;
    }
};
