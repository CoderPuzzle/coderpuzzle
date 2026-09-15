import java.util.HashSet;
import java.util.Set;

class Solution {

    public boolean areSentencesSimilar(String[] sentence1, String[] sentence2, String[][] similarPairs) {
        // Different lengths can never be similar.
        if (sentence1.length != sentence2.length) return false;

        // Words are bare English letters, so "|" cannot occur inside one:
        // joining with it is a collision-free key for the ordered pair. Both
        // orientations enter the set — the relation is symmetric — so one
        // lookup answers "was this pair declared?".
        Set<String> declared = new HashSet<>();
        for (String[] pair : similarPairs) {
            declared.add(pair[0] + "|" + pair[1]);
            declared.add(pair[1] + "|" + pair[0]);
        }

        for (int i = 0; i < sentence1.length; i++) {
            String a = sentence1[i];
            String b = sentence2[i];
            // A word is always similar to itself; anything else must be a
            // declared pair. Nothing chains: big~large and large~huge never
            // make big~huge.
            if (!a.equals(b) && !declared.contains(a + "|" + b)) {
                return false;
            }
        }
        return true;
    }
}
