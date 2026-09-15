class Solution {

    public int[] rotate(int[] nums, int k) {
        int n = nums.length;
        // A rotation by n steps is the identity, so any larger k wraps
        // around to k % n — normalize before chasing cycles.
        k %= n;
        // The positions split into gcd(n, k) cycles under i -> (i + k) % n,
        // and walking each cycle carries its values straight to their final
        // slots with only one element in flight at a time.
        int cycles = gcd(n, k);
        for (int start = 0; start < cycles; ++start) {
            int carried = nums[start];
            int j = start;
            while (true) {
                // Drop the carried element into its rightful slot and catch
                // the one displaced; the cycle closes back at the start.
                int nxt = (j + k) % n;
                int picked = nums[nxt];
                nums[nxt] = carried;
                carried = picked;
                j = nxt;
                if (nxt == start) break;
            }
        }
        // The rotation happened inside the input allocation; the same array,
        // now rotated, is what the judge compares.
        return nums;
    }

    // Euclid's algorithm; gcd(n, 0) is n, so a fully-normalized k of zero
    // collapses into n one-position cycles that change nothing.
    private int gcd(int a, int b) {
        while (b != 0) {
            int temp = a % b;
            a = b;
            b = temp;
        }
        return a;
    }
}
