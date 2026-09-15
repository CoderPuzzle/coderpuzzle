class Solution {

    public boolean doesValidArrayExist(int[] derived) {
        // Each original element enters exactly two derived entries (its own
        // slot and its neighbour's), so folding derived with XOR cancels
        // every pair and lands on 0 exactly when a valid original exists.
        int total = 0;
        for (int value : derived) {
            total ^= value;
        }
        return total == 0;
    }
}
