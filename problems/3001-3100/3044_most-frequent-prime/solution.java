import java.util.HashMap;
import java.util.Map;

class Solution {

    public int mostFrequentPrime(int[][] mat) {
        // From every cell, march each of the eight directions straight to
        // the matrix edge; a path is fully described by its start and
        // direction.
        int[][] directions = { { 0, 1 }, { 1, 1 }, { 1, 0 }, { 1, -1 }, { 0, -1 }, { -1, -1 }, { -1, 0 }, { -1, 1 } };
        Map<Integer, Integer> counts = new HashMap<>();
        for (int i = 0; i < mat.length; ++i) {
            for (int j = 0; j < mat[0].length; ++j) {
                for (int[] direction : directions) {
                    int value = mat[i][j];
                    int x = i + direction[0],
                        y = j + direction[1];
                    while (x >= 0 && x < mat.length && y >= 0 && y < mat[0].length) {
                        // Appending one digit materializes the number formed
                        // at this step, so every step tallies on its own.
                        value = value * 10 + mat[x][y];
                        if (value > 10 && isPrime(value)) {
                            counts.merge(value, 1, Integer::sum);
                        }
                        x += direction[0];
                        y += direction[1];
                    }
                }
            }
        }
        // Highest frequency wins, ties toward the larger prime; no candidate
        // at all leaves the answer at -1.
        int bestValue = -1,
            bestCount = 0;
        for (Map.Entry<Integer, Integer> entry : counts.entrySet()) {
            int value = entry.getKey(),
                count = entry.getValue();
            if (count > bestCount || (count == bestCount && value > bestValue)) {
                bestValue = value;
                bestCount = count;
            }
        }
        return bestValue;
    }

    private boolean isPrime(int value) {
        if (value % 2 == 0) return value == 2;
        for (int factor = 3; (long) factor * factor <= value; factor += 2) {
            if (value % factor == 0) return false;
        }
        return true;
    }
}
