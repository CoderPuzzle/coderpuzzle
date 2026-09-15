class Solution {

    public String processStr(String s, long k) {
        // First pass: the length of the result after each prefix. '#' doubles
        // it, '*' drops one (never below zero), a letter adds one, '%' leaves
        // it untouched. The result can reach 10^15 characters, so the string
        // itself is never built - only these lengths are kept.
        int n = s.length();
        long[] length = new long[n + 1];
        for (int i = 0; i < n; i++) {
            char ch = s.charAt(i);
            if (ch == '*') {
                length[i + 1] = Math.max(0, length[i] - 1);
            } else if (ch == '#') {
                length[i + 1] = length[i] * 2;
            } else if (ch == '%') {
                length[i + 1] = length[i];
            } else {
                length[i + 1] = length[i] + 1;
            }
        }
        if (k >= length[n]) {
            return ".";
        }
        // Walk backwards, undoing each operation to map position k of the
        // final string back to the letter that produced it. The length array
        // pins down where each duplication and reversal boundary sits, so
        // every step is arithmetic, not string work.
        long pos = k;
        for (int i = n - 1; i >= 0; i--) {
            char ch = s.charAt(i);
            if (ch == '*') {
                // Removing the tail keeps every earlier position.
            } else if (ch == '#') {
                long half = length[i];
                if (pos >= half) {
                    pos -= half;
                }
            } else if (ch == '%') {
                pos = length[i] - 1 - pos;
            } else if (pos == length[i]) {
                return String.valueOf(ch);
            }
        }
        return ".";
    }
}
