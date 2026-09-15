import java.util.TreeSet;

class Solution {

    public int[] maxKDistinct(int[] nums, int k) {
        // A duplicate can never be picked twice and never beats an unused
        // value, so only the set of distinct values matters; a TreeSet keeps
        // it sorted ascending.
        TreeSet<Integer> distinct = new TreeSet<>();
        for (int num : nums) {
            distinct.add(num);
        }
        // Walking the set from its largest value down takes the first k of
        // them -- the unique optimum, truncated when fewer than k exist.
        int[] ans = new int[Math.min(k, distinct.size())];
        int written = 0;
        for (int value : distinct.descendingSet()) {
            if (written == ans.length) {
                break;
            }
            ans[written++] = value;
        }
        return ans;
    }
}
