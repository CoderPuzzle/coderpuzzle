class Solution {

    public int minSteps(String s, String t) {
        // The answer is the per-letter deficit of t relative to s; each
        // replacement clears one unit, and deficits equal surpluses.
        int[] counts = new int[26];
        for (int i = 0; i < s.length(); ++i) {
            ++counts[s.charAt(i) - 'a'];
        }
        for (int i = 0; i < t.length(); ++i) {
            --counts[t.charAt(i) - 'a'];
        }
        int steps = 0;
        for (int delta : counts) {
            if (delta < 0) {
                steps -= delta;
            }
        }
        return steps;
    }
}
