class Solution {

    public int countDifferentSubsequenceGCDs(int[] nums) {
        int maxVal = 0;
        for (int v : nums) {
            if (v > maxVal) maxVal = v;
        }
        boolean[] present = new boolean[maxVal + 1];
        for (int v : nums) present[v] = true;
        int count = 0;
        // g is achievable iff the gcd of ALL present multiples of g is exactly g:
        // taking every divisible element minimizes the gcd, so no other subset can do better.
        for (int g = 1; g <= maxVal; g++) {
            int running = 0; // gcd(0, x) = x, so 0 is the identity seed
            for (int multiple = g; multiple <= maxVal; multiple += g) {
                if (present[multiple]) {
                    running = gcd(running, multiple);
                    if (running == g) {
                        // Folding more multiples can only shrink the gcd — confirmed, stop early.
                        count++;
                        break;
                    }
                }
            }
        }
        return count;
    }

    private static int gcd(int a, int b) {
        while (b != 0) {
            int t = a % b;
            a = b;
            b = t;
        }
        return a;
    }
}
