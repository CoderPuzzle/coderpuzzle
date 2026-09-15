import java.util.ArrayList;

class Solution {

    public int[][] findSolution(CustomFunction customfunction, int z) {
        ArrayList<int[]> collected = new ArrayList<>();
        int x = 1;
        int y = 1000;
        while (x <= 1000 && y >= 1) {
            int value = customfunction.f(x, y);
            if (value == z) {
                collected.add(new int[] { x, y });
                ++x;
                --y;
            } else if (value < z) {
                ++x;
            } else {
                --y;
            }
        }
        int[][] pairs = new int[collected.size()][];
        for (int index = 0; index < collected.size(); ++index) {
            pairs[index] = collected.get(index);
        }
        return pairs;
    }
}
