class Solution {

    public double soupServings(int n) {
        // Round up to whole servings of 25 mL each.
        int m = (n + 24) / 25;
        if (m >= 179) {
            return 1.0;
        }

        double[][] table = new double[m + 1][m + 1];
        for (int a = 1; a <= m; a++) {
            for (int b = 1; b <= m; b++) {
                table[a][b] =
                    0.25 *
                    (value(table, a - 4, b) +
                        value(table, a - 3, b - 1) +
                        value(table, a - 2, b - 2) +
                        value(table, a - 1, b - 3));
            }
        }
        return value(table, m, m);
    }

    private double value(double[][] table, int a, int b) {
        if (a <= 0 && b <= 0) {
            return 0.5;
        }
        if (a <= 0) {
            return 1.0;
        }
        if (b <= 0) {
            return 0.0;
        }
        return table[a][b];
    }
}
