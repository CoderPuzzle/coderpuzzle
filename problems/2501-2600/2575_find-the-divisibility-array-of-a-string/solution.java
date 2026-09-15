class Solution {

    public int[] divisibilityArray(String word, int m) {
        // Rolling remainder over digit prefixes: if r was word[0..i-1]
        // mod m, then appending digit d gives (10*r + d) mod m, so each
        // flag costs one multiply-add-mod instead of re-parsing the
        // prefix; longs absorb the ~10^10 intermediate (r < m <= 10^9,
        // so 10*r + d just exceeds the 32-bit range).
        int[] div = new int[word.length()];
        long rem = 0;
        for (int i = 0; i < word.length(); ++i) {
            rem = (rem * 10 + (word.charAt(i) - '0')) % m;
            div[i] = rem == 0 ? 1 : 0;
        }
        return div;
    }
}
