class Solution {

    public String smallestString(String s) {
        // Decrementing a letter helps only when it is not 'a', so the win
        // starts at the first non-'a' letter: shrink that entire run of
        // non-'a' letters and stop at the next 'a' or the end (turning an
        // 'a' into 'z' would only hurt). An all-'a' string has no helpful
        // edit at all, so the mandatory operation wraps just the last
        // letter to 'z'.
        char[] chars = s.toCharArray();
        int n = chars.length;
        int i = 0;
        while (i < n && chars[i] == 'a') {
            i++;
        }
        if (i == n) {
            chars[n - 1] = 'z';
            return new String(chars);
        }
        while (i < n && chars[i] != 'a') {
            chars[i]--;
            i++;
        }
        return new String(chars);
    }
}
