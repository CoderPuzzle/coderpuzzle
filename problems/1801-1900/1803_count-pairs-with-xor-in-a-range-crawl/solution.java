import java.util.Arrays;

class Solution {

    public int countPairs(int[] nums, int low, int high) {
        // The range condition splits into two "at most" counts: the answer is
        // f(high) - f(low - 1), where f(K) counts earlier values y with
        // x XOR y <= K. Every value fits in 15 bits (2 * 10^4 < 2^15), so the
        // trie walks 15 levels, top bit first. Each element is counted
        // against the trie before it is inserted, so every unordered pair is
        // counted exactly once.
        int cap = 15 * nums.length + 1;
        int[][] nxt = new int[cap][2];
        for (int[] row : nxt) Arrays.fill(row, -1);
        int[] cnt = new int[cap];
        int size = 1;
        int answer = 0;
        for (int x : nums) {
            answer += countAtMost(nxt, cnt, x, high);
            answer -= countAtMost(nxt, cnt, x, low - 1);
            int node = 0;
            for (int b = 14; b >= 0; --b) {
                int d = (x >> b) & 1;
                if (nxt[node][d] == -1) nxt[node][d] = size++;
                node = nxt[node][d];
                cnt[node]++;
            }
        }
        return answer;
    }

    // Number of trie values y with x XOR y <= k: a 1 bit of k counts the
    // whole subtree that keeps the xor prefix equal so far (the remaining
    // suffix is then strictly smaller) and descends the other child, while a
    // 0 bit only lets the matching child continue.
    private static int countAtMost(int[][] nxt, int[] cnt, int x, int k) {
        int node = 0,
            total = 0;
        for (int b = 14; b >= 0; --b) {
            int xb = (x >> b) & 1;
            int kb = (k >> b) & 1;
            if (kb == 1) {
                if (nxt[node][xb] != -1) total += cnt[nxt[node][xb]];
                node = nxt[node][1 - xb];
            } else {
                node = nxt[node][xb];
            }
            if (node == -1) return total;
        }
        return total + cnt[node];
    }
}
