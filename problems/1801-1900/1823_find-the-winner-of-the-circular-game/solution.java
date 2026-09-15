import java.util.ArrayList;
import java.util.List;

class Solution {

    public int findTheWinner(int n, int k) {
        List<Integer> friends = new ArrayList<>();
        for (int i = 1; i <= n; i++) friends.add(i);
        // idx marks where the next count starts (friend 1 for the first round).
        int idx = 0;
        while (friends.size() > 1) {
            // -1: the starting friend is counted too; % wraps the circle (k may exceed its size).
            idx = (idx + k - 1) % friends.size();
            // The clockwise neighbor shifts into the vacated slot, so idx already
            // points at where the next count must begin — no extra adjustment needed.
            friends.remove(idx);
        }
        return friends.get(0);
    }
}
