class Solution {
  public:
    string decodeAtIndex(string s, int k) {
        // Forward pass computes the decoded length of each prefix, saturated at
        // a huge cap (far above k) since the true length can exceed 64 bits.
        // Backward pass reduces k through each repetition/letter.
        int n = s.size();
        const long long CAP = 1LL << 62;
        vector<long long> lengths(n);
        long long cur = 0;
        for (int i = 0; i < n; i++) {
            char ch = s[i];
            if (ch >= '2' && ch <= '9') {
                long long d = ch - '0';
                cur = (cur > CAP / d) ? CAP : cur * d;
            } else {
                cur = (cur < CAP) ? cur + 1 : CAP;
            }
            lengths[i] = cur;
        }
        long long kk = k;
        for (int i = n - 1; i >= 0; i--) {
            char ch = s[i];
            if (ch >= '2' && ch <= '9') {
                long long prev = lengths[i - 1];
                kk = (kk - 1) % prev + 1;
            } else {
                if (kk == lengths[i]) {
                    return string(1, ch);
                }
            }
        }
        return string(1, s[0]);
    }
};
