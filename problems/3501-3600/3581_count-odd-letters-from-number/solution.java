import java.util.HashMap;
import java.util.Map;

class Solution {

    public int countOddLetters(int n) {
        // Spell every digit as its lowercase word, concatenate in digit
        // order, and count letters: the answer is how many distinct
        // characters end up with an odd frequency.
        String[] words = { "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine" };
        Map<Character, Integer> counts = new HashMap<>();
        for (int i = 0; i < Integer.toString(n).length(); ++i) {
            String word = words[Integer.toString(n).charAt(i) - '0'];
            for (int j = 0; j < word.length(); ++j) {
                counts.merge(word.charAt(j), 1, Integer::sum);
            }
        }
        int odd = 0;
        for (int count : counts.values()) {
            if (count % 2 == 1) ++odd;
        }
        return odd;
    }
}
