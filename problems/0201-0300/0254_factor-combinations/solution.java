import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int[][] getFactors(int n) {
        List<int[]> combinations = new ArrayList<>();
        backtrack(n, 2, new ArrayList<>(), combinations);
        // Left-to-right growth emits each length group in lexicographic order
        // but interleaves the groups; the pinned display wants fewest factors
        // first, so reassemble by (length, lexicographic).
        combinations.sort((a, b) -> a.length != b.length ? Integer.compare(a.length, b.length) : Arrays.compare(a, b));
        return combinations.toArray(new int[0][]);
    }

    private void backtrack(int remaining, int start, List<Integer> current, List<int[]> combinations) {
        for (int factor = start; factor * factor <= remaining; factor++) {
            if (remaining % factor != 0) continue;
            // factor closes a combination: the cofactor remaining / factor is
            // at least factor, so both stay in [2, n - 1] and the list stays
            // ascending.
            int[] combination = new int[current.size() + 2];
            for (int i = 0; i < current.size(); i++) combination[i] = current.get(i);
            combination[current.size()] = factor;
            combination[current.size() + 1] = remaining / factor;
            combinations.add(combination);
            current.add(factor);
            // Split the cofactor further; the new start stays at factor so
            // the next factor is at least as large.
            backtrack(remaining / factor, factor, current, combinations);
            current.remove(current.size() - 1);
        }
    }
}
