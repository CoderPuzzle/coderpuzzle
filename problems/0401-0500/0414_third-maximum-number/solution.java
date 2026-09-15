class Solution {

    public int thirdMax(int[] nums) {
        // Boxed slots: null marks "not yet filled", so Integer.MIN_VALUE is
        // a legal value and no sentinel constant is needed.
        Integer first = null;
        Integer second = null;
        Integer third = null;
        for (int value : nums) {
            // A repeat of an already-tracked value changes nothing.
            if (first != null && first == value) continue;
            if (second != null && second == value) continue;
            if (third != null && third == value) continue;
            if (first == null || value > first) {
                third = second;
                second = first;
                first = value;
            } else if (second == null || value > second) {
                third = second;
                second = value;
            } else if (third == null || value > third) {
                third = value;
            }
        }
        // No third distinct maximum: fall back to the maximum.
        return third != null ? third : first;
    }
}
