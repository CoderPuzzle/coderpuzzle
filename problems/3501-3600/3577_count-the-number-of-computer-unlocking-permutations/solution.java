class Solution {

    public int countPermutations(int[] complexity) {
        // Computer i can only be unlocked through some already-unlocked
        // j < i with lower complexity, so the leftmost minimum of the whole
        // array can never be unlocked unless it is computer 0 itself: no
        // smaller label exists to unlock it through. Hence the answer is
        // (n - 1)! when complexity[0] is the strict minimum, else 0.
        final long MOD = 1_000_000_007L;
        for (int i = 1; i < complexity.length; i++) if (complexity[i] <= complexity[0]) return 0;
        long count = 1;
        for (long multiplier = 2; multiplier < complexity.length; multiplier++) count = (count * multiplier) % MOD;
        return (int) count;
    }
}
