class Solution {

    public boolean canConstruct(String ransomNote, String magazine) {
        // The magazine is a budget: tally its letters, one slot per letter
        // of the alphabet, then spend the note against that budget.
        int[] counts = new int[26];
        for (int i = 0; i < magazine.length(); ++i) {
            counts[magazine.charAt(i) - 'a']++;
        }
        // A slot dipping below zero means the magazine cannot supply that
        // letter often enough — each of its letters is usable only once.
        for (int i = 0; i < ransomNote.length(); ++i) {
            if (--counts[ransomNote.charAt(i) - 'a'] < 0) {
                return false;
            }
        }
        return true;
    }
}
