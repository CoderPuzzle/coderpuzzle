class Solution {

    public String getSmallestString(String s) {
        // Java strings are immutable, so the scan runs on a char array — the
        // honest equivalent of the in-place algorithm. The first adjacent
        // same-parity descent is the only swap worth making: it lowers an
        // earlier position than any later legal swap could.
        char[] chars = s.toCharArray();
        for (int i = 0; i + 1 < chars.length; i++) {
            if (chars[i] > chars[i + 1] && (chars[i] - '0') % 2 == (chars[i + 1] - '0') % 2) {
                // At most one swap is allowed, so stop right after it.
                char tmp = chars[i];
                chars[i] = chars[i + 1];
                chars[i + 1] = tmp;
                break;
            }
        }
        return new String(chars);
    }
}
