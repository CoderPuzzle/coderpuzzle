import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int[] stringIndices(String[] wordsContainer, String[] wordsQuery) {
        int m = wordsContainer.length;
        int[] lens = new int[m];
        for (int i = 0; i < m; i++) {
            lens[i] = wordsContainer[i].length();
        }

        List<Map<Character, Integer>> children = new ArrayList<>();
        List<Integer> best = new ArrayList<>();
        // Trie over reversed words; node 0 is the root (empty suffix).
        children.add(new HashMap<>());
        best.add(-1);

        // Insert each word backwards, annotating every visited node, root included.
        for (int i = 0; i < m; i++) {
            String word = wordsContainer[i];
            int node = 0;
            if (better(lens, i, best.get(node))) {
                best.set(node, i);
            }
            for (int j = word.length() - 1; j >= 0; j--) {
                char ch = word.charAt(j);
                Integer nxt = children.get(node).get(ch);
                if (nxt == null) {
                    nxt = children.size();
                    children.add(new HashMap<>());
                    best.add(-1);
                    children.get(node).put(ch, nxt);
                }
                node = nxt;
                if (better(lens, i, best.get(node))) {
                    best.set(node, i);
                }
            }
        }

        int[] ans = new int[wordsQuery.length];
        // Walk the reversed query as deep as the trie allows; deepest node's best wins.
        for (int q = 0; q < wordsQuery.length; q++) {
            String word = wordsQuery[q];
            int node = 0;
            // Root's best answers the empty-suffix case (no child matched).
            int res = best.get(0);
            for (int j = word.length() - 1; j >= 0; j--) {
                Integer nxt = children.get(node).get(word.charAt(j));
                if (nxt == null) {
                    break;
                }
                node = nxt;
                res = best.get(node);
            }
            ans[q] = res;
        }
        return ans;
    }

    // Tie-break: shorter word wins, then the smaller index.
    private boolean better(int[] lens, int a, int b) {
        if (b == -1) {
            return true;
        }
        if (lens[a] != lens[b]) {
            return lens[a] < lens[b];
        }
        return a < b;
    }
}
