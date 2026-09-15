import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] gardenNoAdj(int n, int[][] paths) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i <= n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] path : paths) {
            int x = path[0];
            int y = path[1];
            adj.get(x).add(y);
            adj.get(y).add(x);
        }

        int[] color = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            boolean[] used = new boolean[5];
            for (int neighbor : adj.get(i)) {
                if (color[neighbor] != 0) {
                    used[color[neighbor]] = true;
                }
            }
            for (int c = 1; c <= 4; c++) {
                if (!used[c]) {
                    color[i] = c;
                    break;
                }
            }
        }

        int[] answer = new int[n];
        System.arraycopy(color, 1, answer, 0, n);
        return answer;
    }
}
