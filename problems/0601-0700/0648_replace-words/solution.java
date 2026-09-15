import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {

    public String replaceWords(String[] dictionary, String sentence) {
        // One set holds every root, so a prefix test is a single hash
        // lookup. No root is longer than 100 letters, so a word longer
        // than that can stop its scan early — prefixes past the cap could
        // not equal any root anyway.
        Set<String> roots = new HashSet<>();
        for (String root : dictionary) {
            roots.add(root);
        }
        // Each derivative is replaced by its shortest matching root, and
        // the scan tries prefixes shortest first, so the first hit is the
        // answer; a word no root prefixes keeps itself.
        List<String> replaced = new ArrayList<>();
        for (String word : sentence.split(" ")) {
            String replacement = word;
            int limit = Math.min(word.length(), 100);
            for (int length = 1; length <= limit; length++) {
                String prefix = word.substring(0, length);
                if (roots.contains(prefix)) {
                    replacement = prefix;
                    break;
                }
            }
            replaced.add(replacement);
        }
        return String.join(" ", replaced);
    }
}
