import java.util.HashMap;
import java.util.Map;

class Solution {

    private static class TrieNode {

        final Map<Character, TrieNode> children = new HashMap<>();

        boolean end;
    }

    public boolean wordBreak(String s, String[] wordDict) {
        // Trie over the wordDict: child maps keyed by letter, with the end
        // flag marking a node where a word ends. From every reachable
        // position a walk follows s's own characters, so a branch dies at
        // the first character no remaining word shares, and each terminal
        // crossed marks the prefix after it reachable.
        TrieNode root = new TrieNode();
        for (String word : wordDict) {
            TrieNode node = root;
            for (char ch : word.toCharArray()) {
                node = node.children.computeIfAbsent(ch, key -> new TrieNode());
            }
            node.end = true;
        }
        int n = s.length();
        boolean[] reachable = new boolean[n + 1];
        reachable[0] = true;
        for (int i = 0; i < n; ++i) {
            if (!reachable[i]) continue;
            TrieNode node = root;
            for (int j = i; j < n; ++j) {
                TrieNode child = node.children.get(s.charAt(j));
                if (child == null) break;
                node = child;
                // Every terminal on the path ends a word at this depth.
                if (node.end) reachable[j + 1] = true;
            }
        }
        return reachable[n];
    }
}
