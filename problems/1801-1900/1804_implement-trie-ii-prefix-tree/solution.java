import java.util.HashMap;
import java.util.Map;

class Trie {

    // A trie whose nodes each count the inserted instances ending at the
    // node (wordCount) and passing through it (prefixCount). insert walks
    // the word creating children on demand, bumping prefixCount along the
    // path and wordCount at the terminal; the two count queries walk their
    // string as far as nodes exist and read the matching counter,
    // answering 0 when the walk falls off the trie. erase — guaranteed by
    // the constraints to name a present word — confirms a live instance
    // with a first walk, then decrements the same counters on a second;
    // nodes left at zero stay in place, since no live instance crosses
    // them anymore.
    private final TrieNode root = new TrieNode();

    public Trie() {}

    public void insert(String word) {
        TrieNode node = root;
        for (int index = 0; index < word.length(); index++) {
            node = node.children.computeIfAbsent(word.charAt(index), character -> new TrieNode());
            node.prefixCount++;
        }
        node.wordCount++;
    }

    public int countWordsEqualTo(String word) {
        TrieNode node = root;
        for (int index = 0; index < word.length(); index++) {
            node = node.children.get(word.charAt(index));
            if (node == null) {
                return 0;
            }
        }
        return node.wordCount;
    }

    public int countWordsStartingWith(String prefix) {
        TrieNode node = root;
        for (int index = 0; index < prefix.length(); index++) {
            node = node.children.get(prefix.charAt(index));
            if (node == null) {
                return 0;
            }
        }
        return node.prefixCount;
    }

    public void erase(String word) {
        TrieNode node = root;
        for (int index = 0; index < word.length(); index++) {
            node = node.children.get(word.charAt(index));
            if (node == null) {
                return;
            }
        }
        if (node.wordCount == 0) {
            return;
        }
        node = root;
        for (int index = 0; index < word.length(); index++) {
            node = node.children.get(word.charAt(index));
            node.prefixCount--;
        }
        node.wordCount--;
    }

    private static final class TrieNode {

        final Map<Character, TrieNode> children = new HashMap<>();
        int wordCount;
        int prefixCount;
    }
}
