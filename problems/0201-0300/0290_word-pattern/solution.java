import java.util.HashMap;
import java.util.Map;

class Solution {

    public boolean wordPattern(String pattern, String s) {
        // The pattern holds under a bijection: each letter names exactly one
        // word, and no two letters share a word. Each clause is one map,
        // checked together in a single pass over letter/word pairs.
        String[] words = s.split(" ");
        if (pattern.length() != words.length) return false;
        Map<Character, String> letterToWord = new HashMap<>();
        Map<String, Character> wordToLetter = new HashMap<>();
        for (int index = 0; index < words.length; ++index) {
            char letter = pattern.charAt(index);
            String word = words[index];
            // One branch per direction: the letter already names a different
            // word, or the word is already claimed by a different letter.
            String bound = letterToWord.get(letter);
            if (bound != null && !bound.equals(word)) return false;
            Character owner = wordToLetter.get(word);
            if (owner != null && owner != letter) return false;
            letterToWord.put(letter, word);
            wordToLetter.put(word, letter);
        }
        return true;
    }
}
