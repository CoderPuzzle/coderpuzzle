class Solution {

    // Straight simulation: at most ~93k seconds for 2^31 inputs because the
    // consumed total grows quadratically.
    public int[] memLeak(int memory1, int memory2) {
        int t = 1;
        while (true) {
            if (memory1 >= memory2) {
                if (memory1 < t) {
                    break;
                }
                memory1 -= t;
            } else {
                if (memory2 < t) {
                    break;
                }
                memory2 -= t;
            }
            t++;
        }
        return new int[] { t, memory1, memory2 };
    }
}
