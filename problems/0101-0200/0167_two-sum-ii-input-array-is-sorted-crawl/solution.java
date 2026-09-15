class Solution {

    public int[] twoSum(int[] numbers, int target) {
        // Sorted order lets two indexes converge from both ends: the smallest
        // and largest remaining values stand in for every candidate pair, and
        // no extra storage is needed, as the statement demands.
        int low = 0,
            high = numbers.length - 1;
        while (low < high) {
            int total = numbers[low] + numbers[high];
            if (total == target) {
                // The statement's contract is 1-indexed.
                return new int[] { low + 1, high + 1 };
            }
            // Too small: numbers[low] plus anything above numbers[high] only
            // shrinks, so low has no partner left.
            if (total < target) ++low;
            // Too large: numbers[high] plus anything below numbers[low] only
            // shrinks, so high has no partner left.
            else --high;
        }
        return new int[] {};
    }
}
