import java.util.ArrayList;
import java.util.List;

// Two tries, one word list per node: a prefix trie spelling every word
// forward and a suffix trie spelling every word reversed, so a suffix
// reads down it front to back. Words are inserted in index order, so
// every node's list ascends, and f() walks pref down the first
// trie and suff reversed down the second, then merges the two hit nodes'
// lists from their tails -- the first equal pair is the largest shared
// index, and a walk that falls off its trie means no word matches that
// half, answering -1.
class WordFilter {

    // One trie node: 26 child slots indexed by c - 'a' plus the indices
    // of every word whose path crosses it.
    private static final class Node {

        final Node[] children = new Node[26];
        final List<Integer> indices = new ArrayList<>();
    }

    private final Node prefixes = new Node();
    private final Node suffixes = new Node();

    public WordFilter(String[] words) {
        for (int index = 0; index < words.length; ++index) {
            String word = words[index];
            Node node = prefixes;
            for (int position = 0; position < word.length(); ++position) {
                int slot = word.charAt(position) - 'a';
                if (node.children[slot] == null) {
                    node.children[slot] = new Node();
                }
                node = node.children[slot];
                node.indices.add(index);
            }
            node = suffixes;
            for (int position = word.length() - 1; position >= 0; --position) {
                int slot = word.charAt(position) - 'a';
                if (node.children[slot] == null) {
                    node.children[slot] = new Node();
                }
                node = node.children[slot];
                node.indices.add(index);
            }
        }
    }

    public int f(String pref, String suff) {
        Node forward = walkForward(pref);
        if (forward == null) {
            return -1;
        }
        Node backward = walkBackward(suff);
        if (backward == null) {
            return -1;
        }
        List<Integer> front = forward.indices;
        List<Integer> back = backward.indices;
        int i = front.size() - 1;
        int j = back.size() - 1;
        while (i >= 0 && j >= 0) {
            int a = front.get(i);
            int b = back.get(j);
            if (a == b) {
                return a;
            }
            if (a > b) {
                --i;
            } else {
                --j;
            }
        }
        return -1;
    }

    // Walks pref down the prefix trie; null as soon as a slot is empty.
    private Node walkForward(String pref) {
        Node node = prefixes;
        for (int index = 0; index < pref.length(); ++index) {
            node = node.children[pref.charAt(index) - 'a'];
            if (node == null) {
                return null;
            }
        }
        return node;
    }

    // Walks suff down the suffix trie, whose edges spell the reversed
    // words, so the characters are consumed from the end; null as soon as
    // a slot is empty.
    private Node walkBackward(String suff) {
        Node node = suffixes;
        for (int index = suff.length() - 1; index >= 0; --index) {
            node = node.children[suff.charAt(index) - 'a'];
            if (node == null) {
                return null;
            }
        }
        return node;
    }
}
