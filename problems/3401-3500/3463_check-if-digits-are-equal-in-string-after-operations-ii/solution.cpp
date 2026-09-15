class Solution {
  public:
    // One operation is the linear map (I + S) on the digit vector over
    // Z/10, so after t = n-2 operations digit k is sum_j C(t, j) * d[k+j]
    // mod 10. C(t, j) mod 10 is CRT-assembled from Lucas values mod 2
    // (bit-subset test) and mod 5 (digit products) — no length-10^5
    // Pascal row is ever materialized.
    bool hasSameDigits(string s) {
        int t = (int)s.size() - 2;
        // cm5[a][b] = C(a, b) mod 5 for single base-5 digits
        int cm5[5][5] = {};
        for (int a = 0; a < 5; a++) {
            cm5[a][0] = 1;
            for (int b = 1; b <= a; b++) {
                cm5[a][b] = (cm5[a - 1][b - 1] + cm5[a - 1][b]) % 5;
            }
        }
        // crt[r2][r5] = the digit x in 0..9 with x % 2 == r2 and x % 5 == r5
        int crt[2][5] = {};
        for (int x = 0; x < 10; x++)
            crt[x % 2][x % 5] = x;
        int fa = 0, fb = 0;
        for (int j = 0; j <= t; j++) {
            // Lucas mod 2: C(t, j) is odd iff every bit of j is a bit of t.
            int r2 = (j & ~t) == 0 ? 1 : 0;
            int r5 = 1, tj = t, jj = j;
            while (jj > 0) {
                r5 = r5 * cm5[tj % 5][jj % 5] % 5;
                tj /= 5;
                jj /= 5;
            }
            int c = crt[r2][r5];
            fa = (fa + c * (s[j] - '0')) % 10;
            fb = (fb + c * (s[j + 1] - '0')) % 10;
        }
        return fa == fb;
    }
};
