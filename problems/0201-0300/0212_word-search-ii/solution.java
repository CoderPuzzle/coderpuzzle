import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

class Solution {

    public String[] findWords(String[][] board, String[] words) {
        int m = board.length,
            n = board[0].length;
        // Trie of all words; a terminal node stores the whole word so it can
        // be recovered without rebuilding it letter by letter.
        Node root = new Node();
        for (String word : words) {
            Node node = root;
            for (int i = 0; i < word.length(); i++) {
                char ch = word.charAt(i);
                node = node.children.computeIfAbsent(ch, k -> new Node());
            }
            node.word = word;
        }

        // A cell is used at most once within a word (the seen grid tracks
        // the current path); the set dedups words found along several paths.
        Set<String> found = new HashSet<>();
        boolean[][] seen = new boolean[m][n];
        // A word may begin anywhere, so start a DFS from every cell.
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                dfs(board, i, j, root, seen, found);
            }
        }
        List<String> sorted = new ArrayList<>(found);
        Collections.sort(sorted);
        return sorted.toArray(new String[0]);
    }

    private void dfs(String[][] board, int i, int j, Node node, boolean[][] seen, Set<String> found) {
        int m = board.length,
            n = board[0].length;
        char ch = board[i][j].charAt(0);
        // Walk the trie in lockstep with board moves: a missing child rules
        // out the whole subtree of words with that prefix at once.
        Node next = node.children.get(ch);
        if (next == null) return;
        if (next.word != null) found.add(next.word);
        seen[i][j] = true;
        int[] di = { 1, -1, 0, 0 };
        int[] dj = { 0, 0, 1, -1 };
        for (int t = 0; t < 4; t++) {
            int ni = i + di[t],
                nj = j + dj[t];
            if (ni >= 0 && ni < m && nj >= 0 && nj < n && !seen[ni][nj]) {
                dfs(board, ni, nj, next, seen, found);
            }
        }
        // Unmark on the way out so the cell can serve other paths/words.
        seen[i][j] = false;
    }

    private static class Node {

        Map<Character, Node> children = new HashMap<>();
        String word;
    }
}
