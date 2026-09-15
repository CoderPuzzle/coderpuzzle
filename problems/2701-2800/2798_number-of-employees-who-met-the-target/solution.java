class Solution {

    public int numberOfEmployeesWhoMetTarget(int[] hours, int target) {
        // One pass bumps a counter whenever hours[i] >= target; "at least"
        // makes equal-to-target count, which is what Example 1 pins down.
        int met = 0;
        for (int worked : hours) {
            if (worked >= target) ++met;
        }
        return met;
    }
}
