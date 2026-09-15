class Solution {

    // Walk both encodings with running remainders; each step consumes
    // min(remaining1, remaining2) positions and emits one product run,
    // merging into the previous run when the product repeats.
    public long[][] findRLEArray(int[][] encoded1, int[][] encoded2) {
        long[][] tmp = new long[encoded1.length + encoded2.length][];
        int outLen = 0;
        int i = 0,
            j = 0;
        long rem1 = encoded1[0][1];
        long rem2 = encoded2[0][1];
        while (true) {
            long take = Math.min(rem1, rem2);
            long val = (long) encoded1[i][0] * encoded2[j][0];
            if (outLen > 0 && tmp[outLen - 1][0] == val) {
                tmp[outLen - 1][1] += take;
            } else {
                tmp[outLen++] = new long[] { val, take };
            }
            rem1 -= take;
            rem2 -= take;
            if (rem1 == 0) {
                i++;
                if (i == encoded1.length) {
                    break;
                }
                rem1 = encoded1[i][1];
            }
            if (rem2 == 0) {
                j++;
                if (j == encoded2.length) {
                    break;
                }
                rem2 = encoded2[j][1];
            }
        }
        long[][] out = new long[outLen][];
        System.arraycopy(tmp, 0, out, 0, outLen);
        return out;
    }
}
