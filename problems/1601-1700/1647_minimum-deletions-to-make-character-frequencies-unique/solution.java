class Solution {

    public int minDeletions(String s) {
        // Count how often each letter occurs, then process the frequencies
        // from largest to smallest. Whenever a frequency repeats a value we
        // have already committed to, shrink it by one deletion at a time
        // until it lands on an unused value (or hits zero, meaning that
        // letter is deleted away entirely).
        int[] counts = new int[26];
        for (int i = 0; i < s.length(); ++i) {
            counts[s.charAt(i) - 'a']++;
        }
        Integer[] freqs = new Integer[26];
        for (int i = 0; i < 26; ++i) {
            freqs[i] = counts[i];
        }
        java.util.Arrays.sort(freqs, java.util.Collections.reverseOrder());

        java.util.Set<Integer> used = new java.util.HashSet<>();
        int deletions = 0;
        for (int freq : freqs) {
            while (freq > 0 && used.contains(freq)) {
                freq--;
                deletions++;
            }
            if (freq > 0) {
                used.add(freq);
            }
        }
        return deletions;
    }
}
