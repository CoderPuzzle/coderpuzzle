class Solution {

    public int minSteps(String s, String t) {
        // Order is irrelevant; only letter counts matter. The answer is
        // the total absolute per-letter frequency difference.
        int[] counts = new int[26];
        for (int index = 0; index < s.length(); ++index) {
            ++counts[s.charAt(index) - 'a'];
        }
        for (int index = 0; index < t.length(); ++index) {
            --counts[t.charAt(index) - 'a'];
        }
        int total = 0;
        for (int diff : counts) {
            total += Math.abs(diff);
        }
        return total;
    }
}
