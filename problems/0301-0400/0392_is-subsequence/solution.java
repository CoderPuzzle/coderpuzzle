class Solution {

    public boolean isSubsequence(String s, String t) {
        // Walk t once, advancing a pointer into s on every match; greedy is
        // safe — matching each character at its earliest legal position in t
        // never hurts a later one.
        int i = 0;
        for (int j = 0; j < t.length() && i < s.length(); ++j) {
            if (t.charAt(j) == s.charAt(i)) {
                i++;
            }
        }
        // All of s was matched in order iff the pointer reached its end.
        return i == s.length();
    }
}
