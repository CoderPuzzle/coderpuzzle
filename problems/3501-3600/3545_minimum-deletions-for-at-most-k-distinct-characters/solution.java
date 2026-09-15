import java.util.Arrays;

class Solution {

    public int minDeletion(String s, int k) {
        // At most k distinct characters may survive, so keep the k most
        // frequent ones and delete every occurrence of the rest: the
        // answer is the sum of the (distinct - k) smallest frequencies.
        int[] counts = new int[26];
        for (int i = 0; i < s.length(); i++) {
            counts[s.charAt(i) - 'a']++;
        }
        int[] freqs = new int[26];
        int distinct = 0;
        for (int f : counts) {
            if (f > 0) {
                freqs[distinct++] = f;
            }
        }
        Arrays.sort(freqs, 0, distinct);
        int deletions = 0;
        for (int i = 0; i < distinct - k; i++) {
            deletions += freqs[i];
        }
        return deletions;
    }
}
