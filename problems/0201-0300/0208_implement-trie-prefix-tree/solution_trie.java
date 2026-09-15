class Trie {

    // One trie node: 26 child slots indexed by c - 'a' plus a whole-word
    // terminator flag. Nodes are created lazily by insert only.
    private static final class Node {

        final Node[] children = new Node[26];
        boolean end;
    }

    private final Node root = new Node();

    public Trie() {}

    public void insert(String word) {
        Node node = root;
        for (int index = 0; index < word.length(); index++) {
            int slot = word.charAt(index) - 'a';
            if (node.children[slot] == null) {
                node.children[slot] = new Node();
            }
            node = node.children[slot];
        }
        node.end = true;
    }

    // Walks one node per character; returns null as soon as a slot is empty.
    private Node walk(String s) {
        Node node = root;
        for (int index = 0; index < s.length() && node != null; index++) {
            node = node.children[s.charAt(index) - 'a'];
        }
        return node;
    }

    public boolean search(String word) {
        Node node = walk(word);
        return node != null && node.end;
    }

    public boolean startsWith(String prefix) {
        return walk(prefix) != null;
    }
}
