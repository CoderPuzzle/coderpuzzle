class Solution {

    // Manhattan distance is the max of sx*x + sy*y over the four quadrant
    // signings, and every step contributes +/-1 to that signing. Flipping
    // a misaligned step to an aligned one buys +2, so the best reachable
    // value at each prefix is cur + 2*min(k, mis).
    public int maxDistance(String s, int k) {
        int best = 0;
        for (int sx = -1; sx <= 1; sx += 2) {
            for (int sy = -1; sy <= 1; sy += 2) {
                int cur = 0;
                int mis = 0;
                for (int i = 0; i < s.length(); i++) {
                    char c = s.charAt(i);
                    int step;
                    if (c == 'N') {
                        step = sy;
                    } else if (c == 'S') {
                        step = -sy;
                    } else if (c == 'E') {
                        step = sx;
                    } else {
                        step = -sx;
                    }
                    cur += step;
                    if (step < 0) {
                        mis++;
                    }
                    best = Math.max(best, cur + 2 * Math.min(k, mis));
                }
            }
        }
        return best;
    }
}
