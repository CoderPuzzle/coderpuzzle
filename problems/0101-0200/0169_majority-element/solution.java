class Solution {

    public int majorityElement(int[] nums) {
        // Boyer-Moore voting: the majority outnumbers all others combined, so
        // pairing each of its votes against one opposing vote still leaves a
        // survivor — no explicit counting needed.
        int candidate = 0;
        int count = 0;
        for (int num : nums) {
            if (count == 0) {
                // Zero count means a self-cancelling segment just ended;
                // adopt the current element afresh.
                candidate = num;
                count = 1;
            } else if (num == candidate) {
                count += 1;
            } else {
                // A differing element cancels one candidate vote.
                count -= 1;
            }
        }
        // A majority is guaranteed to exist, so the standing candidate is it.
        return candidate;
    }
}
