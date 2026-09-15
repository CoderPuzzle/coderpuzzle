class Solution {

    public int minOperations(String s) {
        // Exactly two alternating targets exist; each position matches
        // one of them, so one mismatch count against the 0101... target
        // determines both costs.
        int mismatch = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) - '0' != i % 2) {
                mismatch++;
            }
        }
        return Math.min(mismatch, s.length() - mismatch);
    }
}
