import java.util.HashMap;
import java.util.Map;

class Solution {

    private String best = "";

    private static class Node {

        Map<Character, Node> children = new HashMap<>();
        boolean end;
    }

    public String longestWord(String[] words) {
        // The trie stores every word once; a node's `end` marks where a word
        // stops. Walking only through `end` nodes keeps every spelled prefix
        // a word, so each path the walk takes is a buildable word.
        Node root = new Node();
        for (String word : words) {
            Node node = root;
            for (char character : word.toCharArray()) {
                node = node.children.computeIfAbsent(character, key -> new Node());
            }
            node.end = true;
        }
        walk(root, "");
        // Nothing buildable at all: the statement's empty-string answer.
        return best;
    }

    private void walk(Node node, String path) {
        // Strictly longer wins; among equal lengths the smaller word
        // wins — compared explicitly, never via child order.
        if (path.length() > best.length() || (path.length() == best.length() && path.compareTo(best) < 0)) {
            best = path;
        }
        for (Map.Entry<Character, Node> entry : node.children.entrySet()) {
            if (entry.getValue().end) {
                walk(entry.getValue(), path + entry.getKey());
            }
        }
    }
}
