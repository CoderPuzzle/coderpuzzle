import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {

    public int visiblePoints(int[][] points, int angle, int[] location) {
        int posx = location[0],
            posy = location[1];
        int same = 0;
        List<Double> degrees = new ArrayList<>();
        for (int[] p : points) {
            int x = p[0],
                y = p[1];
            if (x == posx && y == posy) {
                same++;
            } else {
                double deg = Math.toDegrees(Math.atan2(y - posy, x - posx));
                if (deg < 0) deg += 360.0;
                degrees.add(deg);
            }
        }

        Collections.sort(degrees);
        int n = degrees.size();
        List<Double> doubled = new ArrayList<>(degrees);
        for (double d : degrees) doubled.add(d + 360.0);

        final double eps = 1e-9;
        int best = 0;
        int left = 0;
        for (int right = 0; right < doubled.size(); right++) {
            while (doubled.get(right) - doubled.get(left) > angle + eps) left++;
            best = Math.max(best, Math.min(right - left + 1, n));
        }

        return same + best;
    }
}
