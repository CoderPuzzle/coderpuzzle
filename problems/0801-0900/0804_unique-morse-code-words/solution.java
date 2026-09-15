import java.util.HashSet;
import java.util.Set;

class Solution {

    // Morse code of 'a'..'z' in alphabetical order; a letter's entry sits
    // at c - 'a'.
    private static final String[] MORSE = {
        ".-",
        "-...",
        "-.-.",
        "-..",
        ".",
        "..-.",
        "--.",
        "....",
        "..",
        ".---",
        "-.-",
        ".-..",
        "--",
        "-.",
        "---",
        ".--.",
        "--.-",
        ".-.",
        "...",
        "-",
        "..-",
        "...-",
        ".--",
        "-..-",
        "-.--",
        "--..",
    };

    public int uniqueMorseRepresentations(String[] words) {
        // A word's transformation is its letters' codes joined in order; the
        // set counts distinct results, so equal transformations fold.
        Set<String> seen = new HashSet<>();
        for (String word : words) {
            StringBuilder transformation = new StringBuilder();
            for (int i = 0; i < word.length(); ++i) {
                transformation.append(MORSE[word.charAt(i) - 'a']);
            }
            seen.add(transformation.toString());
        }
        return seen.size();
    }
}
