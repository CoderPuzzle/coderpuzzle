class Solution {

    public int arrayNesting(int[] nums) {
        // A permutation makes i -> nums[i] a graph where every node has
        // exactly one successor and one predecessor, so the array splits
        // into disjoint cycles; s[k] is exactly the cycle containing k, and
        // every member of that cycle generates the same-length set.
        boolean[] seen = new boolean[nums.length];
        int longest = 0;
        for (int start = 0; start < nums.length; ++start) {
            if (seen[start]) {
                continue;
            }
            int length = 0;
            int index = start;
            while (!seen[index]) {
                seen[index] = true;
                index = nums[index];
                ++length;
            }
            longest = Math.max(longest, length);
        }
        return longest;
    }
}
