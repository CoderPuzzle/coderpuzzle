import java.util.*;

class Solution {

    // BFS in layers, where each layer holds every cell reachable with d
    // moves. Teleports cost 0, so each layer first runs its full closure:
    // the first cell of a letter seen in the layer claims every unvisited
    // cell of that letter. Only then are adjacent cells moved into the
    // next layer — a same-layer teleport must beat a move claimed earlier.
    public int minMoves(String[] matrix) {
        int m = matrix.length,
            n = matrix[0].length();
        int total = m * n;
        int[] dist = new int[total];
        Arrays.fill(dist, -1);
        List<List<Integer>> portals = new ArrayList<>();
        for (int i = 0; i < 26; i++) {
            portals.add(new ArrayList<>());
        }
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                char ch = matrix[r].charAt(c);
                if (ch >= 'A' && ch <= 'Z') {
                    portals.get(ch - 'A').add(r * n + c);
                }
            }
        }
        boolean[] used = new boolean[26];
        int[] layer = new int[total];
        int[] nxt = new int[total];
        dist[0] = 0;
        layer[0] = 0;
        int tail = 1;
        int d = 0;
        while (tail > 0) {
            int head = 0;
            while (head < tail) {
                int pos = layer[head++];
                char ch = matrix[pos / n].charAt(pos % n);
                if (ch >= 'A' && ch <= 'Z' && !used[ch - 'A']) {
                    used[ch - 'A'] = true;
                    for (int q : portals.get(ch - 'A')) {
                        if (dist[q] == -1) {
                            dist[q] = d;
                            layer[tail++] = q;
                        }
                    }
                }
            }
            int nextTail = 0;
            for (int i = 0; i < tail; i++) {
                int pos = layer[i];
                int r = pos / n,
                    c = pos - r * n;
                if (r > 0 && dist[pos - n] == -1 && matrix[r - 1].charAt(c) != '#') {
                    dist[pos - n] = d + 1;
                    nxt[nextTail++] = pos - n;
                }
                if (r + 1 < m && dist[pos + n] == -1 && matrix[r + 1].charAt(c) != '#') {
                    dist[pos + n] = d + 1;
                    nxt[nextTail++] = pos + n;
                }
                if (c > 0 && dist[pos - 1] == -1 && matrix[r].charAt(c - 1) != '#') {
                    dist[pos - 1] = d + 1;
                    nxt[nextTail++] = pos - 1;
                }
                if (c + 1 < n && dist[pos + 1] == -1 && matrix[r].charAt(c + 1) != '#') {
                    dist[pos + 1] = d + 1;
                    nxt[nextTail++] = pos + 1;
                }
            }
            int[] tmp = layer;
            layer = nxt;
            nxt = tmp;
            tail = nextTail;
            d++;
        }
        return dist[total - 1];
    }
}
