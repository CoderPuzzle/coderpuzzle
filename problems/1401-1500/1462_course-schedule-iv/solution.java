import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.BitSet;
import java.util.Deque;
import java.util.List;

class Solution {

    public boolean[] checkIfPrerequisite(int numCourses, int[][] prerequisites, int[][] queries) {
        List<List<Integer>> adjacency = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) {
            adjacency.add(new ArrayList<>());
        }
        int[] indegree = new int[numCourses];
        for (int[] pair : prerequisites) {
            adjacency.get(pair[0]).add(pair[1]);
            indegree[pair[1]]++;
        }
        BitSet[] reach = new BitSet[numCourses];
        for (int i = 0; i < numCourses; i++) {
            reach[i] = new BitSet();
        }
        Deque<Integer> queue = new ArrayDeque<>();
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) {
                queue.add(i);
            }
        }
        while (!queue.isEmpty()) {
            int u = queue.poll();
            BitSet bits = (BitSet) reach[u].clone();
            bits.set(u);
            for (int v : adjacency.get(u)) {
                reach[v].or(bits);
                if (--indegree[v] == 0) {
                    queue.add(v);
                }
            }
        }
        boolean[] answer = new boolean[queries.length];
        for (int j = 0; j < queries.length; j++) {
            answer[j] = reach[queries[j][1]].get(queries[j][0]);
        }
        return answer;
    }
}
