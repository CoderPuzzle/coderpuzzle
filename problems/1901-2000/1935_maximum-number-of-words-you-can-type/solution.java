import java.util.HashSet;
import java.util.Set;

class Solution {

    public int canBeTypedWords(String text, String brokenLetters) {
        // Broken keys form a set; a word is typable only when none of its
        // letters are in that set.
        Set<Character> broken = new HashSet<>();
        for (char ch : brokenLetters.toCharArray()) {
            broken.add(ch);
        }
        int count = 0;
        for (String word : text.split(" ")) {
            boolean ok = true;
            for (char ch : word.toCharArray()) {
                if (broken.contains(ch)) {
                    ok = false;
                    break;
                }
            }
            if (ok) {
                count++;
            }
        }
        return count;
    }
}
