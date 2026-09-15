class Solution {

    public int maxFreqSum(String s) {
        // One pass into 26 buckets, then the max over the vowel buckets and
        // the max over the consonant buckets. Missing letters (no vowels or
        // no consonants at all) stay at 0, matching the statement's rule.
        int[] counts = new int[26];
        for (int i = 0; i < s.length(); i++) counts[s.charAt(i) - 'a']++;
        int bestVowel = 0,
            bestConsonant = 0;
        for (int i = 0; i < 26; i++) {
            char ch = (char) ('a' + i);
            if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
                bestVowel = Math.max(bestVowel, counts[i]);
            } else {
                bestConsonant = Math.max(bestConsonant, counts[i]);
            }
        }
        return bestVowel + bestConsonant;
    }
}
