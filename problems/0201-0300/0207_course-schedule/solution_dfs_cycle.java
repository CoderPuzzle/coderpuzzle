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
                        return false;
                    }
                    if (color[nxt] == 0) {
                        color[nxt] = 1;
                        stack.push(new int[] { nxt, 0 });
                    }
                } else {
                    // When a frame runs out of children its node is fully
                    // explored: color it 2 so no later sweep ever descends into
                    // it again.
                    color[node] = 2;
                    stack.pop();
                }
            }
        }
        return true;
    }
}
