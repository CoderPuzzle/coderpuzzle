class Solution {

    public String toLowerCase(String s) {
        // ASCII puts every uppercase letter in 65..90 and its lowercase
        // twin 32 codes higher, so one pass decides each character:
        // inside the range, add 32; outside it, copy untouched. The
        // range check is what keeps the +32 from reaching digits,
        // punctuation, or already-lowercase letters.
        char[] chars = s.toCharArray();
        for (int i = 0; i < chars.length; i++) {
            if (chars[i] >= 'A' && chars[i] <= 'Z') {
                chars[i] = (char) (chars[i] + 32);
            }
        }
        return new String(chars);
    }
}
