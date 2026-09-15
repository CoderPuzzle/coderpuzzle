class Solution {

    public boolean closeStrings(String word1, String word2) {
        // Neither operation creates or destroys a letter: Operation 1 only
        // rearranges characters, and Operation 2 swaps the totals of two
        // existing letters. Two strings are therefore close exactly when
        // they occur over the same letter set with the same multiset of
        // frequencies — tallied into 26-slot count arrays, presence compared
        // slot by slot, then both arrays sorted and compared as lists.
        int[] counts1 = new int[26],
            counts2 = new int[26];
        for (int i = 0; i < word1.length(); ++i) {
            counts1[word1.charAt(i) - 'a']++;
        }
        for (int i = 0; i < word2.length(); ++i) {
            counts2[word2.charAt(i) - 'a']++;
        }
        for (int i = 0; i < 26; ++i) {
            if (counts1[i] > 0 != counts2[i] > 0) {
                return false;
            }
        }
        java.util.Arrays.sort(counts1);
        java.util.Arrays.sort(counts2);
        return java.util.Arrays.equals(counts1, counts2);
    }
}
