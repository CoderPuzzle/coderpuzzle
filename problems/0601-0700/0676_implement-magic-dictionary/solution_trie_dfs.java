class MagicDictionary {

    // One trie node: 26 child slots indexed by c - 'a' plus a whole-word
    // terminator flag. Each buildDict REPLACES the previous tree, so
    // search only ever sees the latest call's words.
    private static final class Node {

        final Node[] children = new Node[26];
        boolean end;
    }

    private Node root = new Node();

    public MagicDictionary() {}

    public void buildDict(String[] dictionary) {
        Node fresh = new Node();
        for (String word : dictionary) {
            Node node = fresh;
            for (int index = 0; index < word.length(); ++index) {
                int slot = word.charAt(index) - 'a';
                if (node.children[slot] == null) {
                    node.children[slot] = new Node();
                }
                node = node.children[slot];
            }
            node.end = true;
        }
        root = fresh;
    }

    public boolean search(String searchWord) {
        return descend(root, searchWord, 0, 1);
    }

    // The child holding the query's own letter continues for free; any other
    // child spends the single change, and success means a flagged node at
    // the query's end with the change spent.
    private boolean descend(Node node, String word, int index, int editsLeft) {
        if (index == word.length()) {
            return node.end && editsLeft == 0;
        }
        int wanted = word.charAt(index) - 'a';
        for (int slot = 0; slot < 26; ++slot) {
            Node child = node.children[slot];
            if (child == null) {
                continue;
            }
            int remaining = editsLeft;
            if (slot != wanted) {
                --remaining;
            }
            if (remaining >= 0 && descend(child, word, index + 1, remaining)) {
                return true;
            }
        }
        return false;
    }
}
