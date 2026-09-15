import java.util.Arrays;
import java.util.HashSet;
import java.util.PriorityQueue;
import java.util.Set;

class Solution {

    private static final class State {

        final int total;
        final int[] indexes;

        State(int total, int[] indexes) {
            this.total = total;
            this.indexes = indexes;
        }
    }

    public int kthSmallest(int[][] mat, int k) {
        int m = mat.length;
        int[] first = new int[m];
        int base = 0;
        for (int r = 0; r < m; r++) {
            base += mat[r][0];
        }
        PriorityQueue<State> heap = new PriorityQueue<>((a, b) -> Integer.compare(a.total, b.total));
        heap.add(new State(base, first));
        Set<String> seen = new HashSet<>();
        seen.add(key(first));
        int answer = 0;
        for (int step = 0; step < k; step++) {
            State top = heap.poll();
            answer = top.total;
            for (int r = 0; r < m; r++) {
                if (top.indexes[r] + 1 < mat[r].length) {
                    int[] candidate = top.indexes.clone();
                    candidate[r] = top.indexes[r] + 1;
                    String candidateKey = key(candidate);
                    if (seen.add(candidateKey)) {
                        int nextTotal = top.total - mat[r][top.indexes[r]] + mat[r][top.indexes[r] + 1];
                        heap.add(new State(nextTotal, candidate));
                    }
                }
            }
        }
        return answer;
    }

    private String key(int[] indexes) {
        return Arrays.toString(indexes);
    }
}
