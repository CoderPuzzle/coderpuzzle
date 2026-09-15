import java.util.HashMap;
import java.util.Map;

class Solution {

    public int countTrapezoids(int[][] points) {
        long mod = 1000000007L;
        // A horizontal trapezoid is exactly: two points on one horizontal
        // line and two on another. Count each line's pairs, then combine.
        Map<Integer, Integer> rows = new HashMap<>();
        for (int[] p : points) rows.merge(p[1], 1, Integer::sum);
        // Per-line pair counts s = C(c, 2) reach ~5e9, past int range,
        // and the pair products range far past 64 bits — reduce modulo
        // the prime as every value is produced.
        long total = 0,
            squared = 0;
        for (int count : rows.values()) {
            long pairs = (((long) count * (count - 1)) / 2) % mod;
            total = (total + pairs) % mod;
            squared = (squared + pairs * pairs) % mod;
        }
        // The sum over line pairs s_i * s_j equals (total^2 - squared)/2;
        // dividing by 2 becomes multiplying by the inverse of 2.
        long inv2 = (mod + 1) / 2;
        return (int) ((((total * total - squared + mod) % mod) * inv2) % mod);
    }
}
