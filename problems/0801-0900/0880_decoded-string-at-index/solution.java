class Solution {

    public String decodeAtIndex(String s, int k) {
        // Forward pass computes the decoded length of each prefix, saturated at
        // a huge cap (far above k) since the true length can exceed 64 bits.
        // Backward pass reduces k through each repetition/letter.
        int n = s.length();
        final long CAP = 1L << 62;
        long[] lengths = new long[n];
        long cur = 0;
        for (int i = 0; i < n; i++) {
            char ch = s.charAt(i);
            if (ch >= '2' && ch <= '9') {
                long d = ch - '0';
                cur = cur > CAP / d ? CAP : cur * d;
            } else {
                cur = cur < CAP ? cur + 1 : CAP;
            }
            lengths[i] = cur;
        }
        long kk = k;
        for (int i = n - 1; i >= 0; i--) {
            char ch = s.charAt(i);
            if (ch >= '2' && ch <= '9') {
                long prev = lengths[i - 1];
                kk = ((kk - 1) % prev) + 1;
            } else {
                if (kk == lengths[i]) {
                    return String.valueOf(ch);
                }
            }
        }
        return String.valueOf(s.charAt(0));
    }
}
