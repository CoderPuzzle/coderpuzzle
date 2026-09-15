class Solution {

    public int maximumScore(int a, int b, int c) {
        // With x <= y <= z the answer is min(x + y, total / 2): the
        // smaller piles limit how often the big one can be paired, and
        // each move spends exactly two stones.
        int x = Math.min(a, Math.min(b, c));
        int z = Math.max(a, Math.max(b, c));
        int y = a + b + c - x - z;
        return x + y <= z ? x + y : (x + y + z) / 2;
    }
}
