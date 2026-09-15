import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int[] findOrder(int numCourses, int[][] prerequisites) {
        // A valid order is exactly a topological ordering of the graph where
        // each pair [course, prereq] is the edge prereq -> course.
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
        // Kahn's algorithm: start from every course with no prerequisites.
        Deque<Integer> queue = new ArrayDeque<>();
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) {
                queue.add(i);
            }
        }
        int[] order = new int[numCourses];
        int taken = 0;
        while (!queue.isEmpty()) {
            int node = queue.poll();
            order[taken++] = node;
            // Emitting a course consumes its edges: dependents lose one
            // prerequisite, and any that reaches zero becomes available.
            for (int nxt : adjacency.get(node)) {
                if (--indegree[nxt] == 0) {
                    queue.add(nxt);
                }
            }
        }
        // A shortfall means a cycle kept positive indegrees forever; the
        // problem requires an empty list rather than a partial order.
        if (taken == numCourses) {
            return order;
        }
        return new int[0];
    }
}
