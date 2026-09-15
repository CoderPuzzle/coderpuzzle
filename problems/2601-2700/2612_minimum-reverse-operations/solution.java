import java.util.Arrays;

class Solution {

    public int[] minReverseOperations(int n, int p, int[] banned, int k) {
        // Alive positions of one parity as jump pointers over slots
        // (position / 2): first returns the smallest alive slot >= pos,
        // removing a slot fuses it into its successor.
        int[][] parent = new int[2][];
        for (int parity = 0; parity < 2; parity++) {
            int size = (n + 1 - parity) / 2;
            parent[parity] = new int[size + 1];
            for (int i = 0; i <= size; i++) {
                parent[parity][i] = i;
            }
        }
        int[] answer = new int[n];
        Arrays.fill(answer, -1);
        int pSlot = p >> 1;
        parent[p & 1][pSlot] = pSlot + 1;
        for (int b : banned) {
            int slot = b >> 1;
            parent[b & 1][slot] = slot + 1;
        }
        int[] queue = new int[n];
        int tail = 0;
        queue[tail++] = p;
        answer[p] = 0;
        for (int head = 0; head < tail; head++) {
            int x = queue[head];
            int left = Math.max(0, x - k + 1);
            int right = Math.min(x, n - k);
            if (left > right) {
                continue;
            }
            int lo = 2 * left + k - 1 - x;
            int hi = 2 * right + k - 1 - x;
            int parity = lo & 1;
            int step = lo >> 1;
            for (
                int slot = first(parent[parity], step);
                2 * slot + parity <= hi;
                slot = first(parent[parity], slot + 1)
            ) {
                int y = 2 * slot + parity;
                answer[y] = answer[x] + 1;
                queue[tail++] = y;
                parent[parity][slot] = slot + 1;
            }
        }
        return answer;
    }

    private int first(int[] parent, int pos) {
        while (parent[pos] != pos) {
            parent[pos] = parent[parent[pos]];
            pos = parent[pos];
        }
        return pos;
    }
}
