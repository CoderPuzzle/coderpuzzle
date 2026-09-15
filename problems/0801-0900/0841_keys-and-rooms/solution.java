import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public boolean canVisitAllRooms(int[][] rooms) {
        // Rooms are nodes and keys are one-way edges, so the rooms that can
        // ever be entered are exactly those reachable from room 0. An
        // explicit stack floods the key graph; the answer compares marked
        // rooms to n.
        boolean[] seen = new boolean[rooms.length];
        seen[0] = true;
        Deque<Integer> pending = new ArrayDeque<>();
        pending.push(0);
        int visited = 1;
        while (!pending.isEmpty()) {
            int room = pending.pop();
            for (int key : rooms[room]) {
                if (seen[key]) {
                    continue;
                }
                seen[key] = true;
                ++visited;
                pending.push(key);
            }
        }
        return visited == rooms.length;
    }
}
