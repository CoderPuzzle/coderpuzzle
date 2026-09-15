class Solution {
  public:
    string largestPalindrome(int n, int k) {
        // A palindrome of length n is pinned down by its first ceil(n/2)
        // digits, and its remainder mod k is a digit-weight sum: half-position
        // j carries its own place value plus its mirror's (the odd-length
        // middle has no separate mirror), so everything runs on residues mod
        // k, never on the full number. For each suffix of the half, track
        // which residues the still-free digits can add; then scan the half
        // left to right, taking the largest digit whose leftover residue
        // stays reachable — the last free digit closes it exactly to zero.
        int m = (n + 1) / 2;
        vector<int> pow_small(m, 1 % k);
        for (int j = 1; j < m; j++) {
            pow_small[j] = pow_small[j - 1] * 10 % k;
        }
        int base = 1 % k;
        for (int i = 0; i < n - m; i++) {
            base = base * 10 % k;
        }
        vector<int> weights(m);
        for (int j = 0; j < m; j++) {
            weights[j] = (base * pow_small[m - 1 - j] + (2 * j != n - 1 ? pow_small[j] : 0)) % k;
        }
        const int full = (1 << k) - 1;

        vector<int> cache(512 * 10, -1);
        vector<int> reachable(m + 1, 0);
        reachable[m] = 1;
        for (int j = m - 1; j >= 0; j--) {
            int mask = reachable[j + 1];
            int w = weights[j];
            int key = mask * 10 + w;
            if (cache[key] < 0) {
                int out = mask;
                int shift = 0;
                for (int t = 0; t < 9; t++) {
                    shift = (shift + w) % k;
                    out |= shift == 0 ? mask : ((mask << shift) | (mask >> (k - shift))) & full;
                }
                cache[key] = out;
            }
            reachable[j] = cache[key];
        }

        string half(m, '0');
        int need = 0;
        for (int j = 0; j < m; j++) {
            int low = j == 0 ? 1 : 0;
            for (int d = 9; d >= low; d--) {
                int rest = ((need - d * weights[j]) % k + k) % k;
                if (reachable[j + 1] >> rest & 1) {
                    need = rest;
                    half[j] = static_cast<char>('0' + d);
                    break;
                }
            }
        }
        string result = half;
        int body_len = n % 2 == 0 ? m : m - 1;
        for (int j = body_len - 1; j >= 0; j--) {
            result += half[j];
        }
        return result;
    }
};
