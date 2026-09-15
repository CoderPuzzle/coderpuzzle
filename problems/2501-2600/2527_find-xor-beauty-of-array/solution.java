class Solution {

    public int xorBeauty(int[] nums) {
        // Per bit position b, the XOR of ((nums[i] | nums[j]) & nums[k])
        // over all triples equals "how many nums have bit b set, mod 2":
        // triples only flip bit b an odd number of times when an odd
        // number of elements carry it. But that is exactly what folding
        // XOR across the array computes in one pass — no triplets needed.
        int beauty = 0;
        for (int num : nums) {
            beauty ^= num;
        }
        return beauty;
    }
}
