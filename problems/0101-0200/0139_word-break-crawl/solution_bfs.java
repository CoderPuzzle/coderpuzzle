import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashSet;
import java.util.Set;

class Solution {

    public boolean wordBreak(String s, String[] wordDict) {
        Set<String> words = new HashSet<>();
        int maxLen = 0;
        for (String word : wordDict) {
            words.add(word);
            // Only entries short enough to fit can ever be a next piece.
            maxLen = Math.max(maxLen, word.length());
        }
        int n = s.length();
        // BFS over start indices: start positions reachable by segmenting a
        // prefix of s. visited keeps each index enqueued at most once.
        boolean[] visited = new boolean[n + 1];
        visited[0] = true;
        Deque<Integer> queue = new ArrayDeque<>();
        queue.offer(0);
        while (!queue.isEmpty()) {
            int i = queue.poll();
            // Try every wordDict entry as the next piece s[i..i+L).
            for (int length = 1; length <= Math.min(maxLen, n - i); length++) {
                if (words.contains(s.substring(i, i + length))) {
                    int end = i + length;
                    // Reaching the far end means the whole string segments.
                    if (end == n) {
                        return true;
                    }
                    if (!visited[end]) {
                        visited[end] = true;
                        queue.offer(end);
                    }
                }
            }
        }
        // No reachable start ever crossed the finish line.
        return false;
    }
}
