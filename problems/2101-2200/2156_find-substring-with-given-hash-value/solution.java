class Solution {

    public String subStrHash(String s, int power, int modulo, int k, int hashValue) {
        int n = s.length();
        long p = power;
        long m = modulo;

        // Hash of the rightmost window, then roll leftwards.
        long cur = 0;
        long pw = 1;
        for (int j = 0; j < k; j++) {
            cur = (cur + (s.charAt(n - k + j) - 'a' + 1) * pw) % m;
            pw = (pw * p) % m;
        }
        long top = 1;
        for (int j = 0; j < k - 1; j++) {
            top = (top * p) % m;
        }
        String answer = cur == hashValue ? s.substring(n - k) : "";
        for (int i = n - k - 1; i >= 0; i--) {
            cur = (((cur - (((s.charAt(i + k) - 'a' + 1) * top) % m) + m) % m) * p + (s.charAt(i) - 'a' + 1)) % m;
            if (cur == hashValue) {
                answer = s.substring(i, i + k); // scanning right-to-left keeps the leftmost match
            }
        }
        return answer;
    }
}
