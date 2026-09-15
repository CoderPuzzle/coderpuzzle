import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public boolean canFinish(int numCourses, int[][] prerequisites) {
        // Each pair [course, prereq] is an edge prereq -> course; all courses
        // can finish exactly when this graph is acyclic.
        List<List<Integer>> adjacency = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) {
            adjacency.add(new ArrayList<>());
        }
        int[] indegree = new int[numCourses];
        for (int[] pair : prerequisites) {
            int course = pair[0];
            int prereq = pair[1];
            adjacency.get(prereq).add(course);
            indegree[course] += 1;
        }
        // Kahn's algorithm: seed with every course that has no prerequisites.
        Deque<Integer> queue = new ArrayDeque<>();
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) {
                queue.add(i);
            }
        }
        int taken = 0;
        while (!queue.isEmpty()) {
            int node = queue.poll();
            taken += 1;
            // Taking a course removes its outgoing edges.
            for (int nxt : adjacency.get(node)) {
                indegree[nxt] -= 1;
                if (indegree[nxt] == 0) {
                    queue.add(nxt);
                }
            }
        }
        // Courses inside a cycle never reach indegree zero, so a shortfall
        // means a cycle trapped the remainder.
        return taken == numCourses;
    }
}
