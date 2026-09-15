class Solution {
  public:
    string smallestPalindrome(string s, int k) {
        // The k-th palindrome is the k-th arrangement of the forced half
        // multiset (count[c] / 2 of each letter), mirrored around the lone
        // odd letter. Walk the half's positions picking, smallest letter
        // first, the letter whose block still contains rank k. Multinomials
        // are capped at k; every intermediate stays below k * n
        // <= 10^6 * 5000, well inside 64-bit.
        long long remaining = k;
        vector<int> counts(26, 0);
        for (char ch : s) {
            counts[ch - 'a'] += 1;
        }
        vector<int> half(26, 0);
        int m = s.size() / 2;
        string middle;
        for (int i = 0; i < 26; ++i) {
            half[i] = counts[i] / 2;
            if (counts[i] % 2 == 1) {
                middle = string(1, char('a' + i));
            }
        }
        if (arrangements(half, m, remaining) < remaining) {
            return "";
        }
        string picked;
        long long r = m;
        while (r > 0) {
            for (int c = 0; c < 26; ++c) {
                if (half[c] == 0)
                    continue;
                half[c] -= 1;
                long long ways = arrangements(half, r - 1, remaining);
                if (remaining <= ways) {
                    picked.push_back(char('a' + c));
                    r -= 1;
                    break;
                }
                remaining -= ways;
                half[c] += 1;
            }
        }
        string tail(picked.rbegin(), picked.rend());
        return picked + middle + tail;
    }

  private:
    // min(multinomial of the half counts over r slots, remaining): a product
    // of binomials abandoned the moment it reaches remaining.
    static long long arrangements(const vector<int> &half, long long r, long long remaining) {
        long long acc = 1;
        long long rem = r;
        for (int i = 0; i < 26; ++i) {
            long long c = half[i];
            if (c == 0)
                continue;
            long long small = min(c, rem - c);
            long long binom = 1;
            for (long long j = 1; j <= small; ++j) {
                binom = binom * (rem - small + j) / j;
                if (binom >= remaining) {
                    binom = remaining;
                    break;
                }
            }
            acc *= binom;
            if (acc >= remaining) {
                return remaining;
            }
            rem -= c;
        }
        return acc;
    }
};
