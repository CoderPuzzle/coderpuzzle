import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.List;
import java.util.Queue;

class Solution {

    public int minimumSemesters(int n, int[][] relations) {
        List<List<Integer>> adjacency = new ArrayList<>();
        for (int i = 0; i <= n; i++) {
            adjacency.add(new ArrayList<>());
        }
        int[] indegree = new int[n + 1];
        for (int[] relation : relations) {
            adjacency.get(relation[0]).add(relation[1]);
            indegree[relation[1]] += 1;
        }
        // semester 1: every course with no prerequisites
        Queue<Integer> queue = new ArrayDeque<>();
        for (int i = 1; i <= n; i++) {
            if (indegree[i] == 0) {
                queue.add(i);
            }
        }
        int semesters = 0;
        int taken = 0;
        while (!queue.isEmpty()) {
            semesters += 1;
            // drain the entire current level as one semester; the answer is
            // the longest prerequisite chain, one level per semester
            for (int sz = queue.size(); sz > 0; sz--) {
                int course = queue.poll();
                taken += 1;
                for (int nxt : adjacency.get(course)) {
                    indegree[nxt] -= 1;
                    // prerequisite count hits zero: ready for next semester
                    if (indegree[nxt] == 0) {
                        queue.add(nxt);
                    }
                }
            }
        }
        // fewer than n taken means a cycle kept some courses at indegree > 0
        return taken == n ? semesters : -1;
    }
}
