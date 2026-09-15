import java.util.*;

class Solution {

    public int openLock(String[] deadends, String target) {
        // BFS over the 10,000 four-digit lock states, one edge per wheel
        // turn: layer order equals turn count, so reaching the target
        // first is optimal.
        Set<String> dead = new HashSet<>(Arrays.asList(deadends));
        String start = "0000";
        // A deadend start means the wheels can never move.
        if (dead.contains(start)) return -1;
        Set<String> seen = new HashSet<>();
        seen.add(start);
        ArrayDeque<String> queue = new ArrayDeque<>();
        queue.add(start);
        int steps = 0;
        while (!queue.isEmpty()) {
            // Process one full layer per pass: every state in it lies
            // exactly `steps` turns from the start.
            int size = queue.size();
            for (int s = 0; s < size; s++) {
                String state = queue.poll();
                if (state.equals(target)) return steps;
                for (int i = 0; i < 4; i++) {
                    for (int delta : new int[] { 1, -1 }) {
                        // Turn wheel i up or down, wrapping 0..9.
                        int digit = (state.charAt(i) - '0' + delta + 10) % 10;
                        String nxt = state.substring(0, i) + (char) ('0' + digit) + state.substring(i + 1);
                        // Mark seen at enqueue time so each state enters
                        // the queue once; never step on a deadend.
                        if (!seen.contains(nxt) && !dead.contains(nxt)) {
                            seen.add(nxt);
                            queue.add(nxt);
                        }
                    }
                }
            }
            steps++;
        }
        // Queue exhausted: every neighbor is seen or dead, so the lock
        // cannot be opened.
        return -1;
    }
}
