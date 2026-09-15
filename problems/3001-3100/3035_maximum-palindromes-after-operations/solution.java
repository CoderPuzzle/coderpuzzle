import java.util.Arrays;

class Solution {

    public int maxPalindromesAfterOperations(String[] words) {
        int[] count = new int[26];
        for (String word : words) {
            for (int index = 0; index < word.length(); index++) {
                count[word.charAt(index) - 'a']++;
            }
        }
        int pairs = 0;
        for (int letter = 0; letter < 26; letter++) {
            pairs += count[letter] / 2;
        }
        int[] halves = new int[words.length];
        for (int index = 0; index < words.length; index++) {
            halves[index] = words[index].length() / 2;
        }
        Arrays.sort(halves);
        int made = 0;
        for (int half : halves) {
            if (half > pairs) {
                break;
            }
            pairs -= half;
            made++;
        }
        return made;
    }
}
