class Solution {

    public boolean queryString(String s, int n) {
        // 10^9 fits in 30 bits, so every i in [1, n] has a short binary
        // form; checking each one as a substring of s directly answers
        // the question.
        for (int i = 1; i <= n; i++) {
            String bin = Integer.toBinaryString(i);
            if (!s.contains(bin)) {
                return false;
            }
        }
        return true;
    }
}
