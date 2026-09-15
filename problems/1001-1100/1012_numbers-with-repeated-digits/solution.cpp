class Solution {
  public:
    int numDupDigitsAtMostN(int n) {
        // Complement counting: tally numbers in [1, n] with all-distinct digits.
        vector<int> digits;
        {
            int t = n;
            while (t > 0) {
                digits.push_back(t % 10);
                t /= 10;
            }
            reverse(digits.begin(), digits.end());
        }
        int length = (int)digits.size();

        // Every length strictly shorter than n's own length:
        // 9 first digits (no leading zero), then 9*8*7*...
        long long distinct = 0;
        for (int d = 1; d < length; d++) {
            long long prod = 9;
            for (int i = 1; i < d; i++)
                prod *= (10 - i);
            distinct += prod;
        }

        // Walk n's own digit string prefix by prefix.
        int usedMask = 0;
        bool repeated = false;
        for (int i = 0; i < length; i++) {
            int digit = digits[i];
            int start = (i == 0) ? 1 : 0;
            // Each smaller unused candidate digit fixes a distinct prefix; the
            // remaining slots take any falling permutation of unused digits.
            long long smaller = 0;
            for (int cand = start; cand < digit; cand++) {
                if (!(usedMask & (1 << cand)))
                    smaller++;
            }
            int remaining = length - i - 1;
            long long perms = 1;
            int avail = 10 - (i + 1);
            for (int r = 0; r < remaining; r++) {
                perms *= avail;
                avail--;
            }
            distinct += smaller * perms;
            // A repeated digit here means no longer number shares this prefix.
            if (usedMask & (1 << digit)) {
                repeated = true;
                break;
            }
            usedMask |= 1 << digit;
        }
        // The walk never broke: n itself has all-distinct digits.
        if (!repeated)
            distinct += 1;

        return (int)((long long)n - distinct);
    }
};
