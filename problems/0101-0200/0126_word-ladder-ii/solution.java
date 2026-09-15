import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

class Solution {

    public String[][] findLadders(String beginWord, String endWord, String[] wordList) {
        Set<String> wordSet = new HashSet<>();
        for (String w : wordList) wordSet.add(w);
        if (!wordSet.contains(endWord)) {
            return new String[0][];
        }
        // Drop beginWord so the search can never route back through it.
        wordSet.remove(beginWord);

        // BFS over the implicit one-letter-difference graph: record each word's
        // shortest distance and a DAG of shortest-path edges.
        Map<String, Integer> dist = new HashMap<>();
        dist.put(beginWord, 0);
        Map<String, List<String>> adjacency = new HashMap<>();
        Deque<String> queue = new ArrayDeque<>();
        queue.add(beginWord);
        String letters = "abcdefghijklmnopqrstuvwxyz";
        while (!queue.isEmpty()) {
            String word = queue.poll();
            int d = dist.get(word);
            char[] chars = word.toCharArray();
            for (int i = 0; i < chars.length; i++) {
                char orig = chars[i];
                // Try substituting each of the 25 other letters at position i.
                for (int li = 0; li < 26; li++) {
                    char c = letters.charAt(li);
                    if (c == orig) continue;
                    chars[i] = c;
                    String nxt = new String(chars);
                    if (!wordSet.contains(nxt)) continue;
                    Integer nd = dist.get(nxt);
                    if (nd == null) {
                        // First discovery: nxt is one level below word.
                        dist.put(nxt, d + 1);
                        adjacency.computeIfAbsent(word, k -> new ArrayList<>()).add(nxt);
                        queue.add(nxt);
                    } else if (nd == d + 1) {
                        // Already exactly one level below: parallel shortest edge.
                        adjacency.computeIfAbsent(word, k -> new ArrayList<>()).add(nxt);
                    }
                    // Same-level or backward edges never lie on a shortest
                    // ladder, so they are simply not recorded.
                }
                chars[i] = orig;
            }
        }

        List<List<String>> result = new ArrayList<>();
        List<String> path = new ArrayList<>();
        path.add(beginWord);

        // DFS over the recorded DAG: every edge advances exactly one BFS level,
        // so any root-to-endWord walk is automatically a shortest ladder.
        class Dfs {

            void run(String word) {
                if (word.equals(endWord)) {
                    result.add(new ArrayList<>(path));
                    return;
                }
                List<String> neighbors = adjacency.get(word);
                if (neighbors == null) return;
                for (String nxt : neighbors) {
                    path.add(nxt);
                    run(nxt);
                    path.remove(path.size() - 1);
                }
            }
        }
        new Dfs().run(beginWord);

        String[][] out = new String[result.size()][];
        for (int i = 0; i < result.size(); i++) {
            out[i] = result.get(i).toArray(new String[0]);
        }
        return out;
    }
}
