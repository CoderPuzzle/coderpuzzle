import java.util.HashSet;
import java.util.Set;

class Trie {

    // One set of whole words, one set of every beginning of every word.
    // Nothing is shared between words beyond accidental hash collisions, so
    // the space bill is the total number of characters inserted rather than
    // the size of the tree.
    private final Set<String> words = new HashSet<>();
    private final Set<String> prefixes = new HashSet<>();

    public Trie() {}

    public void insert(String word) {
        words.add(word);
        // Record every beginning, the word itself included — a word begins
        // with itself, so it is its own longest prefix.
        for (int end = 1; end <= word.length(); end++) {
            prefixes.add(word.substring(0, end));
        }
    }

    public boolean search(String word) {
        return words.contains(word);
    }

    public boolean startsWith(String prefix) {
        return prefixes.contains(prefix);
    }
}
