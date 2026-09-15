class Solution {

    // shift(c, x) is plain character arithmetic: c + x. Each digit at an
    // odd index pairs with the letter immediately before it.
    public String replaceDigits(String s) {
        char[] chars = s.toCharArray();
        for (int i = 1; i < chars.length; i += 2) {
            chars[i] = (char) (chars[i - 1] + (chars[i] - '0'));
        }
        return new String(chars);
    }
}
