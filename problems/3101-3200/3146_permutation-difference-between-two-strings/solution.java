class Solution {

    public int findPermutationDifference(String s, String t) {
        // Every character occurs exactly once in each string, so its
        // share of the sum is fixed by the two positions alone: one pass
        // records where each letter sits in s, and one pass over t
        // reduces every term to a lookup plus an absolute difference.
        int[] pos = new int[26];
        for (int i = 0; i < s.length(); ++i) {
            pos[s.charAt(i) - 'a'] = i;
        }
        int total = 0;
        for (int i = 0; i < t.length(); ++i) {
            total += Math.abs(i - pos[t.charAt(i) - 'a']);
        }
        return total;
    }
}
