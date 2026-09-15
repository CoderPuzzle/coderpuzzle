class Solution {
  public:
    int punishmentNumber(int n) {
        int total = 0;
        for (int i = 1; i <= n; ++i) {
            const string digits = to_string(i * i);
            const int length = static_cast<int>(digits.size());
            bool found = false;
            for (int mask = 0; mask < (1 << (length - 1)); ++mask) {
                int sum = 0, cur = 0;
                bool pruned = false;
                for (int k = 0; k < length; ++k) {
                    cur = cur * 10 + (digits[k] - '0');
                    if ((mask >> k) & 1) {
                        sum += cur;
                        cur = 0;
                        if (sum > i) {
                            pruned = true;
                            break;
                        }
                    }
                }
                if (!pruned && sum + cur == i) {
                    found = true;
                    break;
                }
            }
            if (found) {
                total += i * i;
            }
        }
        return total;
    }
};
