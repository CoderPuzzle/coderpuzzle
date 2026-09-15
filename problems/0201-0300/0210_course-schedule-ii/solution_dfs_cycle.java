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
        for (int[] pair : prerequisites) {
            int course = pair[0];
            int prereq = pair[1];
            adjacency.get(prereq).add(course);
        }
        // Three-color DFS: 0 = unvisited, 1 = on the current DFS path, 2 = fully
        // explored. Meeting a neighbor colored 1 is a back edge, i.e. a cycle.
        int[] color = new int[numCourses];
        // The DFS runs on an explicit stack of (node, next-child-index) frames
        // so a long chain of prerequisites cannot overflow the call stack.
        List<Integer> order = new ArrayList<>();
        for (int start = 0; start < numCourses; start++) {
            if (color[start] != 0) continue;
            color[start] = 1;
            Deque<int[]> stack = new ArrayDeque<>();
            stack.push(new int[] { start, 0 });
            while (!stack.isEmpty()) {
                int[] frame = stack.peek();
                int node = frame[0];
                if (frame[1] < adjacency.get(node).size()) {
                    int nxt = adjacency.get(node).get(frame[1]);
                    frame[1] += 1;
                    if (color[nxt] == 1) {
                        return new int[0];
                    }
                    if (color[nxt] == 0) {
                        color[nxt] = 1;
                        stack.push(new int[] { nxt, 0 });
                    }
                } else {
                    // When a frame runs out of children its node is fully
                    // explored: color it 2 and append it after every course
                    // that depends on it.
                    color[node] = 2;
                    order.add(node);
                    stack.pop();
                }
            }
        }
        // Reversing the postorder puts every prerequisite before the courses
        // that depend on it; a back edge short-circuits with an empty list.
        int[] result = new int[numCourses];
        for (int i = 0; i < numCourses; i++) {
            result[numCourses - 1 - i] = order.get(i);
        }
        return result;
    }
}
