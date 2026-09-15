class Solution {

    public String reverseWords(String s) {
        // Java strings are immutable, so the scan runs on a char array — the
        // honest equivalent of the in-place algorithm.
        char[] chars = s.toCharArray();
        int n = chars.length;
        int start = 0;
        while (start < n) {
            int end = start;
            while (end < n && chars[end] != ' ') {
                end++;
            }
            // chars[start..end) is one word: reverse it with two pointers.
            int lo = start,
                hi = end - 1;
            while (lo < hi) {
                char tmp = chars[lo];
                chars[lo++] = chars[hi];
                chars[hi--] = tmp;
            }
            start = end + 1;
        }
        return new String(chars);
    }
}
