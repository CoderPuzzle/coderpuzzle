import java.util.ArrayDeque;
import java.util.Queue;

class Solution {

    public boolean canReach(int[] arr, int start) {
        // BFS over indexes: from i, the only successors are i +/- arr[i]. Each
        // index is visited once, so cycles cannot loop forever and a chain of
        // 5*10^4 indexes never touches the recursion stack.
        int n = arr.length;
        boolean[] visited = new boolean[n];
        Queue<Integer> queue = new ArrayDeque<>();
        queue.add(start);
        visited[start] = true;
        while (!queue.isEmpty()) {
            int i = queue.remove();
            if (arr[i] == 0) {
                return true;
            }
            int next = i + arr[i];
            if (next >= 0 && next < n && !visited[next]) {
                visited[next] = true;
                queue.add(next);
            }
            next = i - arr[i];
            if (next >= 0 && next < n && !visited[next]) {
                visited[next] = true;
                queue.add(next);
            }
        }
        return false;
    }
}
