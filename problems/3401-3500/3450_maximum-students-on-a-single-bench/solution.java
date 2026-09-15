class Solution {

    // Mark (bench, student) pairs in a fixed grid; the first sight of a
    // pair is the only one that bumps its bench's unique count.
    public int maxStudentsOnBench(int[][] students) {
        boolean[][] seen = new boolean[101][101];
        int[] count = new int[101];
        for (int[] entry : students) {
            if (!seen[entry[1]][entry[0]]) {
                seen[entry[1]][entry[0]] = true;
                count[entry[1]]++;
            }
        }
        int best = 0;
        for (int bench = 1; bench <= 100; bench++) {
            best = Math.max(best, count[bench]);
        }
        return best;
    }
}
