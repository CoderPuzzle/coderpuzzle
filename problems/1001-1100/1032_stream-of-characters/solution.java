import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class StreamChecker {

    private static final class Node {

        final Map<Character, Node> children = new HashMap<>();
        boolean word;
    }

    private final Node root = new Node();
    // Trie nodes reached by the stream suffixes so far (one per start);
    // index 0 is always the root so a fresh suffix can begin every query.
    private List<Node> nodes;

    public StreamChecker(String[] words) {
        for (String word : words) {
            Node node = root;
            for (int index = 0; index < word.length(); index++) {
                node = node.children.computeIfAbsent(word.charAt(index), key -> new Node());
            }
            node.word = true;
        }
        nodes = new ArrayList<>();
        nodes.add(root);
    }

    public boolean query(char letter) {
        List<Node> advanced = new ArrayList<>();
        boolean hit = false;
        for (Node node : nodes) {
            // index 0 is always the root
            Node child = node.children.get(letter);
            if (child != null) {
                advanced.add(child);
                hit = hit || child.word;
            }
        }
        advanced.add(root);
        nodes = advanced;
        return hit;
    }
}
