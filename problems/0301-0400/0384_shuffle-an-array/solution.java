import java.util.concurrent.ThreadLocalRandom;

class Solution {

    // The pristine original is kept untouched; every shuffle() runs
    // Fisher-Yates on a fresh copy — slot i (from the top down) swaps with a
    // uniformly chosen slot in [0, i] — so each of the n! orderings is
    // exactly equally likely, and reset() is a plain copy.
    private final int[] original;

    public Solution(int[] nums) {
        original = nums.clone();
    }

    public int[] reset() {
        return original.clone();
    }

    public int[] shuffle() {
        int[] array = original.clone();
        for (int i = array.length - 1; i > 0; i--) {
            int j = ThreadLocalRandom.current().nextInt(i + 1);
            int temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
}
