import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[][] addPoly(int[][] poly1, int[][] poly2) {
        List<int[]> result = new ArrayList<>();
        int i = 0,
            j = 0;
        while (i < poly1.length && j < poly2.length) {
            int power1 = poly1[i][0];
            int power2 = poly2[j][0];
            if (power1 == power2) {
                int coefficient = poly1[i][1] + poly2[j][1];
                if (coefficient != 0) {
                    result.add(new int[] { power1, coefficient });
                }
                i++;
                j++;
            } else if (power1 > power2) {
                result.add(poly1[i]);
                i++;
            } else {
                result.add(poly2[j]);
                j++;
            }
        }
        while (i < poly1.length) {
            result.add(poly1[i]);
            i++;
        }
        while (j < poly2.length) {
            result.add(poly2[j]);
            j++;
        }
        return result.toArray(new int[result.size()][]);
    }
}
