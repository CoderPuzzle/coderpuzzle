import java.util.HashMap;
import java.util.Map;

class Solution {

    public boolean wordPatternMatch(String pattern, String s) {
        // Depth-first walk over pattern positions with a two-way map:
        // forward (char -> word) keeps every later occurrence of the char
        // honest, backward (word -> char) enforces the bijection.
        return match(pattern, s, 0, 0, new HashMap<>(), new HashMap<>());
    }

    private boolean match(
        String pattern,
        String s,
        int pi,
        int si,
        Map<Character, String> charToWord,
        Map<String, Character> wordToChar
    ) {
        if (pi == pattern.length()) {
            // Every char placed: a match only when s is fully consumed.
            return si == s.length();
        }
        if (si == s.length()) {
            // Chars remain but s is exhausted; mappings are non-empty.
            return false;
        }
        char letter = pattern.charAt(pi);
        String mapped = charToWord.get(letter);
        if (mapped != null) {
            // A char already mapped must reproduce its word exactly.
            return s.startsWith(mapped, si) && match(pattern, s, pi + 1, si + mapped.length(), charToWord, wordToChar);
        }
        for (int end = si + 1; end <= s.length(); end++) {
            String word = s.substring(si, end);
            // Bijection: the word is already another char's image.
            if (wordToChar.containsKey(word)) continue;
            charToWord.put(letter, word);
            wordToChar.put(word, letter);
            if (match(pattern, s, pi + 1, end, charToWord, wordToChar)) return true;
            charToWord.remove(letter);
            wordToChar.remove(word);
        }
        return false;
    }
}
