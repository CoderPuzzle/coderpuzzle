class Solution {

    public String removeKdigits(String num, int k) {
        StringBuilder stack = new StringBuilder();
        for (int i = 0; i < num.length(); ++i) {
            char ch = num.charAt(i);
            // A kept digit larger than the arriving one should go: a smaller
            // digit in a more significant position outweighs anything later.
            while (k > 0 && stack.length() > 0 && stack.charAt(stack.length() - 1) > ch) {
                stack.deleteCharAt(stack.length() - 1);
                --k;
            }
            stack.append(ch);
        }
        // Unspent removals mean the digits were non-decreasing; drop from the
        // end, where the largest digits sit.
        int len = stack.length() - k;
        stack.setLength(Math.max(len, 0));
        // Strip leading zeros; a fully consumed input yields "0", not "".
        int pos = 0;
        while (pos < stack.length() && stack.charAt(pos) == '0') {
            ++pos;
        }
        String result = stack.substring(pos);
        return result.isEmpty() ? "0" : result;
    }
}
