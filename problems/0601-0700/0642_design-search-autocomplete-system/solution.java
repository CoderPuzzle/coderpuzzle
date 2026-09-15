import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class AutocompleteSystem {

    private static final class Node {

        final Map<Character, Node> children = new HashMap<>();
        int hotness;
    }

    private final Node root = new Node();
    private Node current = root;
    private final StringBuilder typed = new StringBuilder();

    public AutocompleteSystem(String[] sentences, int[] times) {
        for (int index = 0; index < sentences.length; index++) {
            Node node = insert(sentences[index]);
            node.hotness += times[index];
        }
    }

    public List<String> input(char c) {
        if (c == '#') {
            insert(typed.toString()).hotness++;
            typed.setLength(0);
            current = root;
            return new ArrayList<>();
        }
        typed.append(c);
        current = current == null ? null : current.children.get(c);
        if (current == null) {
            return new ArrayList<>();
        }
        List<String> sentences = new ArrayList<>();
        List<Integer> hotnesses = new ArrayList<>();
        collect(current, new StringBuilder(typed), sentences, hotnesses);
        List<Integer> order = new ArrayList<>();
        for (int index = 0; index < sentences.size(); index++) {
            order.add(index);
        }
        order.sort((a, b) -> {
            int byHotness = hotnesses.get(b) - hotnesses.get(a);
            return byHotness != 0 ? byHotness : sentences.get(a).compareTo(sentences.get(b));
        });
        List<String> top = new ArrayList<>();
        for (int index = 0; index < Math.min(3, order.size()); index++) {
            top.add(sentences.get(order.get(index)));
        }
        return top;
    }

    private Node insert(String sentence) {
        Node node = root;
        for (int index = 0; index < sentence.length(); index++) {
            node = node.children.computeIfAbsent(sentence.charAt(index), key -> new Node());
        }
        return node;
    }

    private void collect(Node node, StringBuilder prefix, List<String> sentences, List<Integer> hotnesses) {
        if (node.hotness > 0) {
            sentences.add(prefix.toString());
            hotnesses.add(node.hotness);
        }
        for (Map.Entry<Character, Node> entry : node.children.entrySet()) {
            prefix.append(entry.getKey());
            collect(entry.getValue(), prefix, sentences, hotnesses);
            prefix.deleteCharAt(prefix.length() - 1);
        }
    }
}
