class Solution {
  public:
    int minAnagramLength(string s) {
        // t repeats, so len(t) = L divides n = len(s) and every n / L
        // chunk must carry the same letter multiset as the first chunk:
        // sweep the divisors of n ascending and take the first survivor.
        // A running count that exceeds the first chunk's count already
        // proves the chunk differs, so failed candidates die early.
        int n = static_cast<int>(s.size());
        for (int length = 1; length <= n; length++) {
            if (n % length != 0) {
                continue;
            }
            array<int, 26> base{};
            for (int i = 0; i < length; i++) {
                base[s[i] - 'a']++;
            }
            array<int, 26> run{};
            int filled = 0;
            bool ok = true;
            for (int i = 0; i < n && ok; i++) {
                int c = s[i] - 'a';
                if (++run[c] > base[c]) {
                    ok = false;
                    break;
                }
                if (++filled == length) {
                    if (run != base) {
                        ok = false;
                        break;
                    }
                    run.fill(0);
                    filled = 0;
                }
            }
            if (ok && filled == 0) {
                return length;
            }
        }
        return n;
    }
};
