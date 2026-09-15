import java.util.HashSet;
import java.util.Set;

class Solution {

    public boolean isPathCrossing(String path) {
        int x = 0,
            y = 0;
        Set<Long> visited = new HashSet<>();
        visited.add(encode(0, 0));
        for (char step : path.toCharArray()) {
            if (step == 'N') {
                y++;
            } else if (step == 'S') {
                y--;
            } else if (step == 'E') {
                x++;
            } else {
                x--;
            }
            if (!visited.add(encode(x, y))) {
                return true;
            }
        }
        return false;
    }

    private long encode(int x, int y) {
        return ((long) (x + 100000) << 32) | (y + 100000);
    }
}
