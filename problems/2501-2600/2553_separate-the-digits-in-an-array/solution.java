class Solution {

    public int[] separateDigits(int[] nums) {
        // First pass sizes the result from each number's digit count; the
        // second strips digits by division into a small buffer and flushes
        // it reversed, keeping numbers in order while digits lift low-first.
        // Values reach 10^5, whose six-digit ceiling bounds the buffer.
        int total = 0;
        for (int x : nums) {
            for (int v = x; v > 0; v /= 10) total++;
        }
        int[] out = new int[total];
        int idx = 0;
        int[] buf = new int[6];
        for (int x : nums) {
            int t = 0;
            for (int v = x; v > 0; v /= 10) {
                buf[t++] = v % 10;
            }
            while (t > 0) {
                out[idx++] = buf[--t];
            }
        }
        return out;
    }
}
