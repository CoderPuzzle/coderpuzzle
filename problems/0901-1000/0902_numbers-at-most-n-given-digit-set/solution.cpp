class Solution {
  public:
    int atMostNGivenDigitSet(vector<string> &digits, int n) {
        // Numbers shorter than n are composeable by construction and all
        // fall below n; for n's own length, walk its digits: a set digit
        // strictly below the current one fixes a smaller prefix and frees
        // the remaining positions, while the equal path survives only
        // while n's own digit stays in the set.
        string s = to_string(n);
        int length = s.size();
        int k = digits.size();
        bool has[10] = {};
        for (const string &d : digits) {
            has[d[0] - '0'] = true;
        }
        int below[10] = {};
        for (int v = 1; v < 10; v++) {
            below[v] = below[v - 1] + (has[v - 1] ? 1 : 0);
        }
        vector<long long> powers(length + 1);
        powers[0] = 1;
        for (int j = 1; j <= length; j++) {
            powers[j] = powers[j - 1] * k;
        }
        long long total = 0;
        for (int len = 1; len < length; len++) {
            total += powers[len];
        }
        bool alive = true;
        for (int i = 0; i < length; i++) {
            int v = s[i] - '0';
            // Set digits below n's digit v leave the tail free.
            total += (long long)below[v] * powers[length - 1 - i];
            if (!has[v]) {
                // The equal path dies here: no prefix of n extends past v.
                alive = false;
                break;
            }
        }
        if (alive) {
            // Every digit of n is in the set, so n itself counts.
            total++;
        }
        return (int)total;
    }
};
