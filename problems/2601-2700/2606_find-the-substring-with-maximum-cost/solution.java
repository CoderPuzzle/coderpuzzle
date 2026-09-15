class Solution {

    public int maximumCostSubstring(String s, String chars, int[] vals) {
        // Resolve each letter's value once (defaults from the alphabet,
        // overrides from chars), then Kadane's algorithm; snapping the
        // running sum back to 0 whenever it dips negative keeps the empty
        // substring's cost of 0 as the floor for the answer. Costs are
        // bounded by 1e5 * 1000 = 1e8, safely inside int range.
        int[] value = new int[26];
        for (int i = 0; i < 26; ++i) {
            value[i] = i + 1;
        }
        for (int i = 0; i < chars.length(); ++i) {
            value[chars.charAt(i) - 'a'] = vals[i];
        }
        int best = 0;
        int run = 0;
        for (int i = 0; i < s.length(); ++i) {
            run = Math.max(run + value[s.charAt(i) - 'a'], 0);
            best = Math.max(best, run);
        }
        return best;
    }
}
