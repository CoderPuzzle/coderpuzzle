class Solution {

    public int[] cycleLengthQueries(int n, int[][] queries) {
        // Adding edge (a, b) closes exactly one cycle: the unique tree path
        // between a and b plus the new edge. Walking the deeper endpoint up
        // one parent (v / 2) at a time until both endpoints meet visits
        // exactly the edges of that path, so the answer is one more than
        // the number of steps taken. Values stay below 2^30, so each walk
        // is at most 30 steps.
        int[] answer = new int[queries.length];
        for (int qi = 0; qi < queries.length; qi++) {
            int a = queries[qi][0];
            int b = queries[qi][1];
            int steps = 1;
            while (a != b) {
                if (a > b) {
                    a >>= 1;
                } else {
                    b >>= 1;
                }
                steps++;
            }
            answer[qi] = steps;
        }
        return answer;
    }
}
