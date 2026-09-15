import java.util.ArrayList;
import java.util.List;

class Solution {

    // One trie node: 26 child slots indexed by c - 'a' plus a whole-root
    // terminator flag; nodes appear lazily as roots are inserted.
    private static class Node {

        final Node[] children = new Node[26];
        boolean end;
    }

    public String replaceWords(String[] dictionary, String sentence) {
        // The trie stores every root once; a node's `end` marks that a root
        // stops exactly there. Walking a word's own letters visits its
        // prefixes shortest first, so the first `end` on the path is the
        // shortest matching root — no per-length retries, and no length cap:
        // the tree has no branches deeper than the longest root anyway.
        Node trie = new Node();
        for (String root : dictionary) {
            Node node = trie;
            for (int index = 0; index < root.length(); index++) {
                int slot = root.charAt(index) - 'a';
                if (node.children[slot] == null) {
                    node.children[slot] = new Node();
                }
                node = node.children[slot];
            }
            node.end = true;
        }
        // A walk that falls off the tree, or finishes without ever reaching
        // an `end`, found no root prefix — the word stands for itself.
        List<String> replaced = new ArrayList<>();
        for (String word : sentence.split(" ")) {
            String replacement = word;
            Node node = trie;
            for (int index = 0; index < word.length(); index++) {
                node = node.children[word.charAt(index) - 'a'];
                if (node == null) {
                    break;
                }
                if (node.end) {
                    replacement = word.substring(0, index + 1);
                    break;
                }
            }
            replaced.add(replacement);
        }
        return String.join(" ", replaced);
    }
}
