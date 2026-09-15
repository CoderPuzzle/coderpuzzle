class Solution {
  public:
    long long totalWaviness(long long num1, long long num2) {
        // f(N) = total waviness of 1..N; the answer telescopes to
        // f(num2) - f(num1 - 1). Two parallel tables track live prefixes
        // by (started, last digit, second-last digit): "tight" prefixes
        // still equal to N's prefix and "free" prefixes already below it.
        // Digit 10 stands for "no digit yet". Everything accumulates in
        // long long: the largest achievable answer is f(10^15) ~ 7.4e15.
        return f(num2) - f(num1 - 1);
    }

  private:
    using Tables = long long[2][11][11];

    static void blank(long long table[2][11][11]) {
        for (int s = 0; s < 2; ++s) {
            for (int a = 0; a < 11; ++a) {
                for (int b = 0; b < 11; ++b) {
                    table[s][a][b] = 0;
                }
            }
        }
    }

    static long long f(long long n) {
        if (n <= 0) {
            return 0;
        }
        int digits[16];
        int length = 0;
        while (n > 0) {
            digits[length++] = (int)(n % 10);
            n /= 10;
        }
        for (int i = 0, j = length - 1; i < j; ++i, --j) {
            int swap = digits[i];
            digits[i] = digits[j];
            digits[j] = swap;
        }
        const int NONE = 10;

        static long long tight_cnt[2][11][11];
        static long long tight_wav[2][11][11];
        static long long free_cnt[2][11][11];
        static long long free_wav[2][11][11];
        blank(tight_cnt);
        blank(tight_wav);
        blank(free_cnt);
        blank(free_wav);
        tight_cnt[0][NONE][NONE] = 1;
        for (int pos = 0; pos < length; ++pos) {
            long long n_tight_cnt[2][11][11];
            long long n_tight_wav[2][11][11];
            long long n_free_cnt[2][11][11];
            long long n_free_wav[2][11][11];
            blank(n_tight_cnt);
            blank(n_tight_wav);
            blank(n_free_cnt);
            blank(n_free_wav);
            for (int group = 0; group < 2; ++group) {
                bool tight = group == 0;
                auto &cnt = tight ? tight_cnt : free_cnt;
                auto &wav = tight ? tight_wav : free_wav;
                int hi = tight ? digits[pos] : 9;
                for (int s = 0; s <= 1; ++s) {
                    for (int d1 = 0; d1 <= NONE; ++d1) {
                        for (int d2 = 0; d2 <= NONE; ++d2) {
                            long long count = cnt[s][d1][d2];
                            if (count == 0) {
                                continue;
                            }
                            long long total = wav[s][d1][d2];
                            for (int x = 0; x <= hi; ++x) {
                                int started = (s == 1 || x != 0) ? 1 : 0;
                                int gain = 0;
                                int nd1;
                                int nd2;
                                if (s == 1) {
                                    if (d2 != NONE && ((d1 > d2 && d1 > x) || (d1 < d2 && d1 < x))) {
                                        gain = 1;
                                    }
                                    nd1 = x;
                                    nd2 = d1;
                                } else if (started == 1) {
                                    nd1 = x;
                                    nd2 = NONE;
                                } else {
                                    nd1 = NONE;
                                    nd2 = NONE;
                                }
                                long long acc = total + gain * count;
                                if (tight && x == hi) {
                                    n_tight_cnt[started][nd1][nd2] += count;
                                    n_tight_wav[started][nd1][nd2] += acc;
                                } else {
                                    n_free_cnt[started][nd1][nd2] += count;
                                    n_free_wav[started][nd1][nd2] += acc;
                                }
                            }
                        }
                    }
                }
            }
            for (int s = 0; s < 2; ++s) {
                for (int a = 0; a < 11; ++a) {
                    for (int b = 0; b < 11; ++b) {
                        tight_cnt[s][a][b] = n_tight_cnt[s][a][b];
                        tight_wav[s][a][b] = n_tight_wav[s][a][b];
                        free_cnt[s][a][b] = n_free_cnt[s][a][b];
                        free_wav[s][a][b] = n_free_wav[s][a][b];
                    }
                }
            }
        }
        long long grand = 0;
        for (auto *tab : {tight_wav, free_wav}) {
            for (int s = 0; s <= 1; ++s) {
                for (int d1 = 0; d1 <= NONE; ++d1) {
                    for (int d2 = 0; d2 <= NONE; ++d2) {
                        grand += tab[s][d1][d2];
                    }
                }
            }
        }
        return grand;
    }
};
