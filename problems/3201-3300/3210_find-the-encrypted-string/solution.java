class Solution {

    public String getEncryptedString(String s, int k) {
        // The encrypted string is the input rotated left by k positions:
        // position i of the answer reads s[(i + k) % n], the character k
        // places forward with wraparound. The modulo folds completed laps
        // back into range, so k larger than n needs no special case — one
        // linear pass copies every character from its source index.
        int n = s.length();
        char[] encrypted = new char[n];
        for (int i = 0; i < n; ++i) {
            encrypted[i] = s.charAt((i + k) % n);
        }
        return new String(encrypted);
    }
}
