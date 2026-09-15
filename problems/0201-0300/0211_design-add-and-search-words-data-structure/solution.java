class WordDictionary {

    // One trie node: 26 child slots indexed by c - 'a' plus a whole-word
    // terminator flag.
    private static final class Node {

        final Node[] children = new Node[26];
        boolean end;
    }

    private final Node root = new Node();
    private String query;

    public WordDictionary() {}

    public void addWord(String word) {
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

    public boolean search(String word) {
        query = word;
        return match(root, 0);
    }

    // A letter descends its single slot; a dot tries every non-empty slot.
    private boolean match(Node node, int index) {
        if (node == null) {
            return false;
        }
        if (index == query.length()) {
            return node.end;
        }
        char ch = query.charAt(index);
        if (ch == '.') {
            for (Node child : node.children) {
                if (match(child, index + 1)) {
                    return true;
                }
            }
            return false;
        }
        return match(node.children[ch - 'a'], index + 1);
    }
}
