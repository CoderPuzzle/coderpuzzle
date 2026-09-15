import java.util.Arrays;

class Solution {

    public String reverseWords(String s) {
        // The first word only fixes the target vowel count; each later
        // word matching it is reversed in place, everything else (word
        // order, separators) stays as-is.
        String[] words = s.split(" ");
        int target = countVowels(words[0]);
        for (int i = 1; i < words.length; i++) {
            if (countVowels(words[i]) == target) {
                words[i] = new StringBuilder(words[i]).reverse().toString();
            }
        }
        return String.join(" ", words);
    }

    // Counts a/e/i/o/u occurrences in one word.
    private int countVowels(String word) {
        int count = 0;
        for (int i = 0; i < word.length(); i++) {
            char c = word.charAt(i);
            if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
                count++;
            }
        }
        return count;
    }
}
