class Solution {

    // Tally the digit supply once, then walk the 450 candidate numbers
    // (hundreds 1-9, tens 0-9, even units) and keep those whose digit
    // multiset fits the supply.
    public int totalNumbers(int[] digits) {
        int[] counts = new int[10];
        for (int d : digits) {
            counts[d] += 1;
        }
        int total = 0;
        int[] units = { 0, 2, 4, 6, 8 };
        for (int h = 1; h <= 9; h++) {
            for (int t = 0; t <= 9; t++) {
                for (int u : units) {
                    int[] need = new int[10];
                    need[h] += 1;
                    need[t] += 1;
                    need[u] += 1;
                    boolean fits = true;
                    for (int v = 0; v < 10; v++) {
                        fits &= need[v] <= counts[v];
                    }
                    if (fits) {
                        total += 1;
                    }
                }
            }
        }
        return total;
    }
}
