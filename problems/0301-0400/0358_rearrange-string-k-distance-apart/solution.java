import java.util.PriorityQueue;

class Solution {

    public String rearrangeString(String s, int k) {
        // Distance k apart is vacuous when k <= 1: any two positions already
        // qualify, and the pinned canonical returns s unchanged.
        if (k <= 1) {
            return s;
        }
        int[] counts = new int[26];
        for (int i = 0; i < s.length(); ++i) {
            counts[s.charAt(i) - 'a']++;
        }
        // Max-heap keyed by (count desc, letter asc) — the pinned pass order.
        // Entries are {remaining count, letter index}.
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> {
            if (a[0] != b[0]) return b[0] - a[0];
            return a[1] - b[1];
        });
        for (int letter = 0; letter < 26; ++letter) {
            if (counts[letter] > 0) {
                heap.offer(new int[] { counts[letter], letter });
            }
        }
        StringBuilder out = new StringBuilder();
        int total = s.length();
        while (total > 0) {
            int take = Math.min(k, heap.size());
            // Fewer than k distinct letters while more remain: some window of
            // k consecutive positions would have to repeat a letter, so no
            // arrangement exists.
            if (take < k && total > take) {
                return "";
            }
            // Drain the pass before pushing back, so a letter never repeats
            // within its own pass.
            int[][] taken = new int[take][];
            for (int i = 0; i < take; ++i) {
                taken[i] = heap.poll();
            }
            for (int[] entry : taken) {
                out.append((char) ('a' + entry[1]));
                total--;
                if (entry[0] - 1 > 0) {
                    heap.offer(new int[] { entry[0] - 1, entry[1] });
                }
            }
        }
        return out.toString();
    }
}
