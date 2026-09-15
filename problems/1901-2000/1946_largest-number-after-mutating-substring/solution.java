class Solution {

    public String maximumNumber(String num, int[] change) {
        // Greedy: the leftmost digit change strictly improves is where the
        // mutation must start -- an earlier digit is more significant, so
        // improving it dominates any later start. Extend through every
        // non-hurting digit (change[d] >= d) and stop at the first hurting
        // one, since the mutated substring must stay contiguous.
        char[] digits = num.toCharArray();
        boolean started = false;
        for (int i = 0; i < num.length(); ++i) {
            int d = num.charAt(i) - '0';
            if (change[d] > d) {
                started = true;
                digits[i] = (char) ('0' + change[d]);
            } else if (change[d] < d && started) {
                break;
            }
        }
        return new String(digits);
    }
}
