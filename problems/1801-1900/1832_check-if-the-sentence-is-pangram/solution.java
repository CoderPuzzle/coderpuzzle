import java.util.HashSet;
import java.util.Set;

class Solution {

    // A sentence is a pangram exactly when its set of distinct characters
    // is the whole lowercase alphabet, so collect the distinct characters
    // and compare the set's size with 26.
    public boolean checkIfPangram(String sentence) {
        Set<Character> seen = new HashSet<>();
        for (int i = 0; i < sentence.length(); i++) {
            seen.add(sentence.charAt(i));
            if (seen.size() == 26) {
                return true;
            }
        }
        return false;
    }
}
