class Solution {

    public int countSubstrings(String s) {
        int n = s.length();
        int count = 0;
        for (int center = 0; center < n; center++) {
            // Each palindrome has one center: a character (odd) or a gap (even),
            // so trying both shapes discovers every occurrence exactly once.
            count += expand(s, center, center);
            count += expand(s, center, center + 1);
        }
        return count;
    }

    private int expand(String s, int left, int right) {
        int count = 0;
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            // Every successful step is one more palindrome; stop at the
            // first mismatch — wrapping can never restore symmetry.
            count++;
            left--;
            right++;
        }
        return count;
    }
}
