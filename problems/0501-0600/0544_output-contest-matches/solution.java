import java.util.ArrayList;
import java.util.List;

class Solution {

    public String findContestMatch(int n) {
        // One string per surviving side of the bracket, in round order. Each
        // round folds the list against its own reverse: side i meets side
        // m-1-i, the strong-vs-weak pairing, recorded as "(a,b)" with a bare
        // comma and no space.
        List<String> sides = new ArrayList<>();
        for (int team = 1; team <= n; ++team) {
            sides.add(Integer.toString(team));
        }
        while (sides.size() > 1) {
            int m = sides.size();
            List<String> next = new ArrayList<>();
            for (int i = 0; i < m / 2; ++i) {
                next.add("(" + sides.get(i) + "," + sides.get(m - 1 - i) + ")");
            }
            sides = next;
        }
        return sides.get(0);
    }
}
