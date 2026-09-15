class Solution {

    public long totalWaviness(long num1, long num2) {
        // f(N) = total waviness of 1..N; the answer telescopes to
        // f(num2) - f(num1 - 1). Two parallel tables track live prefixes
        // by (started, last digit, second-last digit): "tight" prefixes
        // still equal to N's prefix and "free" prefixes already below it.
        // Digit 10 stands for "no digit yet". Everything accumulates in
        // long: the largest achievable answer is f(10^15) ~ 7.4e15.
        return f(num2) - f(num1 - 1);
    }

    private long f(long n) {
        if (n <= 0) {
            return 0;
        }
        int length = (int) (Math.log10(n) + 1);
        long rest = n;
        int[] digits = new int[length];
        for (int i = length - 1; i >= 0; i--) {
            digits[i] = (int) (rest % 10);
            rest /= 10;
        }
        final int NONE = 10;

        // tables[s][d1][d2] with s the started flag; counts and waviness
        // sums live side by side per group (tight / free).
        long[][][] tightCnt = blank();
        long[][][] tightWav = blank();
        long[][][] freeCnt = blank();
        long[][][] freeWav = blank();
        tightCnt[0][NONE][NONE] = 1;
        for (int limit : digits) {
            long[][][] nTightCnt = blank();
            long[][][] nTightWav = blank();
            long[][][] nFreeCnt = blank();
            long[][][] nFreeWav = blank();
            for (int group = 0; group < 2; group++) {
                boolean tight = group == 0;
                long[][][] cnt = tight ? tightCnt : freeCnt;
                long[][][] wav = tight ? tightWav : freeWav;
                int hi = tight ? limit : 9;
                for (int s = 0; s <= 1; s++) {
                    for (int d1 = 0; d1 <= NONE; d1++) {
                        for (int d2 = 0; d2 <= NONE; d2++) {
                            long count = cnt[s][d1][d2];
                            if (count == 0) {
                                continue;
                            }
                            long total = wav[s][d1][d2];
                            for (int x = 0; x <= hi; x++) {
                                int started = s == 1 || x != 0 ? 1 : 0;
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
                                long acc = total + gain * count;
                                if (tight && x == hi) {
                                    nTightCnt[started][nd1][nd2] += count;
                                    nTightWav[started][nd1][nd2] += acc;
                                } else {
                                    nFreeCnt[started][nd1][nd2] += count;
                                    nFreeWav[started][nd1][nd2] += acc;
                                }
                            }
                        }
                    }
                }
            }
            tightCnt = nTightCnt;
            tightWav = nTightWav;
            freeCnt = nFreeCnt;
            freeWav = nFreeWav;
        }
        long grand = 0;
        for (long[][][] tab : new long[][][][] { tightWav, freeWav }) {
            for (int s = 0; s <= 1; s++) {
                for (int d1 = 0; d1 <= NONE; d1++) {
                    for (int d2 = 0; d2 <= NONE; d2++) {
                        grand += tab[s][d1][d2];
                    }
                }
            }
        }
        return grand;
    }

    private long[][][] blank() {
        long[][][] table = new long[2][11][11];
        return table;
    }
}
