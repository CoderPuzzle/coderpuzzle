class Solution {

    // Cut right after the k-th word: each space closes one word, so the
    // k-th space (when it exists) sits exactly at the cut point.
    public String truncateSentence(String s, int k) {
        int count = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == ' ') {
                count++;
                if (count == k) {
                    return s.substring(0, i);
                }
            }
        }
        return s;
    }
}
