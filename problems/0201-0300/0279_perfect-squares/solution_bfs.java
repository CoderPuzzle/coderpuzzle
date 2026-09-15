import java.util.HashSet;
import java.util.Set;

class Solution {

    public int numSquares(int n) {
        // The squares available as subtractions, ascending — so the inner
        // loop can break as soon as s exceeds the remainder.
        int root = (int) Math.sqrt(n);
        int[] squares = new int[root];
        for (int i = 1; i <= root; i++) {
            squares[i - 1] = i * i;
        }
        // Level-by-level BFS over remainders: level k holds every value
        // reachable from n by subtracting exactly k squares.
        Set<Integer> level = new HashSet<>();
        level.add(n);
        Set<Integer> seen = new HashSet<>();
        seen.add(n);
        int steps = 0;
        while (!level.isEmpty()) {
            steps++;
            Set<Integer> nextLevel = new HashSet<>();
            for (int r : level) {
                for (int s : squares) {
                    if (s > r) {
                        break;
                    }
                    int t = r - s;
                    // Reaching 0 at this depth settles the answer.
                    if (t == 0) {
                        return steps;
                    }
                    // First sight of a remainder is its shallowest depth; a
                    // revisit through another square can never beat it.
                    if (seen.add(t)) {
                        nextLevel.add(t);
                    }
                }
            }
            level = nextLevel;
        }
        // Lagrange's four-square theorem bounds the search at four levels,
        // so the loop always returns from inside.
        return steps;
    }
}
