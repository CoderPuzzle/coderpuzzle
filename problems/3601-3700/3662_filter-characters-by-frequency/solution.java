class Solution {

    public String filterCharacters(String s, int k) {
        // Tally every occurrence into a fixed 26-slot table; the
        // lowercase-only input makes each index a plain offset from 'a'.
        int[] counts = new int[26];
        for (int i = 0; i < s.length(); i++) {
            counts[s.charAt(i) - 'a']++;
        }
        // Scan left to right, keeping exactly the characters whose total
        // count is strictly below the threshold; original order falls out
        // of the scan for free.
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            if (counts[s.charAt(i) - 'a'] < k) {
                result.append(s.charAt(i));
            }
        }
        return result.toString();
    }
}
