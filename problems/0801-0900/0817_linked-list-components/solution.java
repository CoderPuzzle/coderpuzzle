import java.util.HashSet;
import java.util.Set;

class Solution {

    public int numComponents(ListNode head, int[] nums) {
        // O(1) membership tests: the set holds every value of nums once.
        Set<Integer> wanted = new HashSet<>();
        for (int value : nums) {
            wanted.add(value);
        }
        int components = 0;
        boolean previousIn = false;
        for (ListNode node = head; node != null; node = node.next) {
            boolean currentIn = wanted.contains(node.val);
            // A component starts exactly where membership turns on: this
            // node is in nums and its predecessor was not. The initial
            // false flag folds the head into the same rule — no predecessor.
            if (currentIn && !previousIn) {
                ++components;
            }
            previousIn = currentIn;
        }
        return components;
    }
}
