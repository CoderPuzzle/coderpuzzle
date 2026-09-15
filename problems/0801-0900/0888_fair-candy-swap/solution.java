import java.util.HashSet;
import java.util.Set;

class Solution {

    public int[] fairCandySwap(int[] aliceSizes, int[] bobSizes) {
        // Swapping Alice's box a for Bob's box b leaves both totals equal
        // exactly when sumA - a + b == sumB - b + a, which rearranges to
        // b == a - delta with delta = (sumA - sumB) / 2. A hash set of
        // Bob's boxes answers each candidate in O(1), and one scan that
        // keeps the smallest matching pair (a first, then b) yields the
        // statement's pinned answer.
        long aliceTotal = 0;
        for (int size : aliceSizes) {
            aliceTotal += size;
        }
        long bobTotal = 0;
        for (int size : bobSizes) {
            bobTotal += size;
        }
        long delta = (aliceTotal - bobTotal) / 2;
        Set<Long> bobBoxes = new HashSet<>();
        for (int size : bobSizes) {
            bobBoxes.add((long) size);
        }
        long bestAlice = 0;
        long bestBob = 0;
        boolean found = false;
        for (int size : aliceSizes) {
            long b = size - delta;
            boolean better = !found || size < bestAlice || (size == bestAlice && b < bestBob);
            if (bobBoxes.contains(b) && better) {
                bestAlice = size;
                bestBob = b;
                found = true;
            }
        }
        if (!found) {
            return new int[] {};
        }
        return new int[] { (int) bestAlice, (int) bestBob };
    }
}
