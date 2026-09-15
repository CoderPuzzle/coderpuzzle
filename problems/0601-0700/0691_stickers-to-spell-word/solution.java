import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

class Solution {

    public int minStickers(String[] stickers, String target) {
        // BFS over the bitmask of spelled target positions: bit i is set
        // once position i holds a cut letter. From each state, one copy of
        // a sticker spends its letters on the uncovered positions left to
        // right — covering more positions with the same single copy can
        // never hurt, since equal letters are interchangeable. Layers of
        // the BFS are sticker counts, so the first visit to the full mask
        // is the minimum; a target letter found on no sticker at all makes
        // the task impossible.
        int m = target.length();
        int full = (1 << m) - 1;
        int[] need = new int[m];
        boolean[] available = new boolean[26];
        for (String word : stickers) {
            for (int i = 0; i < word.length(); ++i) {
                available[word.charAt(i) - 'a'] = true;
            }
        }
        for (int i = 0; i < m; ++i) {
            need[i] = target.charAt(i) - 'a';
            if (!available[need[i]]) {
                return -1;
            }
        }
        int[][] stocks = new int[stickers.length][];
        for (int s = 0; s < stickers.length; ++s) {
            int[] counts = new int[26];
            for (int i = 0; i < stickers[s].length(); ++i) {
                counts[stickers[s].charAt(i) - 'a']++;
            }
            stocks[s] = counts;
        }
        int[] distance = new int[full + 1];
        Arrays.fill(distance, -1);
        distance[0] = 0;
        Deque<Integer> queue = new ArrayDeque<>();
        queue.add(0);
        while (!queue.isEmpty()) {
            int mask = queue.poll();
            if (mask == full) {
                return distance[mask];
            }
            int steps = distance[mask] + 1;
            for (int[] counts : stocks) {
                int[] remaining = counts.clone();
                int next = mask;
                for (int i = 0; i < m; ++i) {
                    int bit = 1 << i;
                    if ((mask & bit) == 0 && remaining[need[i]] > 0) {
                        remaining[need[i]]--;
                        next |= bit;
                    }
                }
                if (next != mask && distance[next] < 0) {
                    distance[next] = steps;
                    queue.add(next);
                }
            }
        }
        return -1;
    }
}
