import java.util.Arrays;

class Solution {

    public int twoCitySchedCost(int[][] costs) {
        // Switching person i from B to A changes the total by a_i - b_i alone,
        // so the cheapest plan applies the n smallest differences.
        int[][] ordered = costs.clone();
        Arrays.sort(ordered, (a, b) -> Integer.compare(a[0] - a[1], b[0] - b[1]));
        // First half (most negative differences) flies A, rest fly B — the
        // split satisfies the half/half count structurally.
        int n = ordered.length / 2;
        int total = 0;
        for (int i = 0; i < ordered.length; i++) {
            total += i < n ? ordered[i][0] : ordered[i][1];
        }
        return total;
    }
}
