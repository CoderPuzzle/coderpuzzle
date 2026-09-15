class Solution {

    public boolean isAnagram(String s, String t) {
        // An anagram is a rearrangement: both strings must hold exactly the
        // same letters with the same counts. The constraints promise lowercase
        // English letters, so 26 counters, one per letter, capture the multiset.
        if (s.length() != t.length()) return false;
        int[] counts = new int[26];
        for (int index = 0; index < s.length(); ++index) {
            counts[s.charAt(index) - 'a']++;
            counts[t.charAt(index) - 'a']--;
        }
        // A nonzero slot is a letter the two strings disagreed on.
        for (int count : counts) {
            if (count != 0) return false;
        }
        return true;
    }
}
