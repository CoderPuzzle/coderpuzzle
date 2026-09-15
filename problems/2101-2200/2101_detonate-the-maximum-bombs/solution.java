import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int maximumDetonation(int[][] bombs) {
        int count = bombs.length;
        List<List<Integer>> graph = new ArrayList<>();
        for (int index = 0; index < count; index++) {
            graph.add(new ArrayList<>());
        }
        for (int source = 0; source < count; source++) {
            for (int target = 0; target < count; target++) {
                long dx = (long) bombs[source][0] - bombs[target][0];
                long dy = (long) bombs[source][1] - bombs[target][1];
                long radius = bombs[source][2];
                if (dx * dx + dy * dy <= radius * radius) {
                    graph.get(source).add(target);
                }
            }
        }

        int answer = 0;
        for (int start = 0; start < count; start++) {
            boolean[] seen = new boolean[count];
            seen[start] = true;
            Deque<Integer> stack = new ArrayDeque<>();
            stack.push(start);
            int reached = 0;
            while (!stack.isEmpty()) {
                int source = stack.pop();
                reached++;
                for (int target : graph.get(source)) {
                    if (!seen[target]) {
                        seen[target] = true;
                        stack.push(target);
                    }
                }
            }
            answer = Math.max(answer, reached);
        }
        return answer;
    }
}
