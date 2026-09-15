import java.util.Set;

class Solution {

    public int vowelStrings(String[] words, int left, int right) {
        // A word counts exactly when both endpoints are vowels; the vowel
        // set keeps each endpoint check constant time.
        Set<Character> vowels = Set.of('a', 'e', 'i', 'o', 'u');
        int count = 0;
        for (int i = left; i <= right; ++i) {
            String word = words[i];
            if (vowels.contains(word.charAt(0)) && vowels.contains(word.charAt(word.length() - 1))) {
                count++;
            }
        }
        return count;
    }
}
