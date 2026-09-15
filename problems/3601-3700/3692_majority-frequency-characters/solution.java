class Solution {

    public String majorityFrequencyGroup(String s) {
        // Tally every occurrence into a fixed 26-slot table; the
        // lowercase-only input makes each index a plain offset from 'a'.
        int[] counts = new int[26];
        for (int i = 0; i < s.length(); i++) {
            counts[s.charAt(i) - 'a']++;
        }
        // Evaluate each candidate frequency's bucket and keep the largest
        // gathering of distinct characters; sweeping frequencies upward lets
        // ">=" hand size ties to the larger frequency, and the ascending slot
        // scan collects the winners already in lexicographic order.
        String best = "";
        for (int k = 1; k <= s.length(); k++) {
            StringBuilder chars = new StringBuilder();
            for (int i = 0; i < 26; i++) {
                if (counts[i] == k) {
                    chars.append((char) ('a' + i));
                }
            }
            if (chars.length() >= best.length()) {
                best = chars.toString();
            }
        }
        return best;
    }
}
