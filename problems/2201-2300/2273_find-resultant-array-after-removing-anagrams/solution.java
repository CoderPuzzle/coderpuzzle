import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public String[] removeAnagrams(String[] words) {
        List<String> kept = new ArrayList<>();
        String prev = "";
        for (String word : words) {
            char[] letters = word.toCharArray();
            Arrays.sort(letters);
            String signature = new String(letters);
            if (!signature.equals(prev)) {
                kept.add(word);
                prev = signature;
            }
        }
        return kept.toArray(new String[0]);
    }
}
