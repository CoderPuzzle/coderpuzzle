class Solution {

    public String alienOrder(String[] words) {
        final int A = 26;
        boolean[] present = new boolean[A];
        for (String w : words) {
            for (int i = 0; i < w.length(); i++) present[w.charAt(i) - 'a'] = true;
        }
        int total = 0;
        for (int c = 0; c < A; c++) if (present[c]) total++;

        boolean[][] adj = new boolean[A][A];
        int[] indeg = new int[A];
        for (int i = 0; i + 1 < words.length; i++) {
            String prev = words[i],
                nxt = words[i + 1];
            if (prev.length() > nxt.length() && prev.startsWith(nxt)) return "";
            int m = Math.min(prev.length(), nxt.length());
            for (int j = 0; j < m; j++) {
                int a = prev.charAt(j) - 'a',
                    b = nxt.charAt(j) - 'a';
                if (a != b) {
                    if (!adj[a][b]) {
                        adj[a][b] = true;
                        indeg[b]++;
                    }
                    break;
                }
            }
        }

        // Kahn's algorithm always taking the smallest available letter
        // (equivalent to a min-heap of ready characters).
        boolean[] done = new boolean[A];
        StringBuilder order = new StringBuilder();
        for (int count = 0; count < total; count++) {
            int ch = -1;
            for (int c = 0; c < A; c++) {
                if (present[c] && !done[c] && indeg[c] == 0) {
                    ch = c;
                    break;
                }
            }
            if (ch < 0) return ""; // cycle -> invalid
            done[ch] = true;
            order.append((char) ('a' + ch));
            for (int nb = 0; nb < A; nb++) {
                if (adj[ch][nb]) indeg[nb]--;
            }
        }
        return order.toString();
    }
}
