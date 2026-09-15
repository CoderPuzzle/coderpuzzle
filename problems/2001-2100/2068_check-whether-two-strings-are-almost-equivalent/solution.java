class Solution {

    public boolean checkAlmostEquivalent(String word1, String word2) {
        int[] differences = new int[26];
        for (int index = 0; index < word1.length(); index++) {
            differences[word1.charAt(index) - 'a']++;
            differences[word2.charAt(index) - 'a']--;
        }
        for (int difference : differences) {
            if (Math.abs(difference) > 3) {
                return false;
            }
        }
        return true;
    }
}
