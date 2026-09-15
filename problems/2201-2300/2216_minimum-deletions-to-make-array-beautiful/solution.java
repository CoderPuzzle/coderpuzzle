class Solution {

    public int minDeletion(int[] nums) {
        // Build the kept array greedily: an even slot takes anything, an odd
        // slot must differ from its pair, so an equal arrival is the deletion.
        int deletions = 0;
        int kept = 0;
        int pairFirst = 0;
        for (int value : nums) {
            if (kept % 2 == 0) {
                pairFirst = value;
                kept++;
            } else if (value != pairFirst) {
                kept++;
            } else {
                deletions++;
            }
        }
        if (kept % 2 == 1) {
            // An odd tail can never be paired; its last element goes too.
            deletions++;
        }
        return deletions;
    }
}
