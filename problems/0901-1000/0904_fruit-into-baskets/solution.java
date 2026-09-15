import java.util.HashMap;
import java.util.Map;

class Solution {

    public int totalFruit(int[] fruits) {
        // The rules ask for the longest stretch of trees holding at most two
        // fruit types: two baskets, one type each, one fruit from every tree
        // picked while moving right. A sliding window over a type->count map
        // maintains exactly that — extend the right edge tree by tree, and
        // whenever a third type enters, retire trees from the left until one
        // type's count reaches zero and drops out. The window then always
        // spans the longest legal picking trip ending at the current tree, so
        // its length contests the answer at every step.
        Map<Integer, Integer> count = new HashMap<>();
        int best = 0;
        int left = 0;
        for (int right = 0; right < fruits.length; ++right) {
            count.merge(fruits[right], 1, Integer::sum);
            while (count.size() > 2) {
                int fruit = fruits[left];
                if (count.merge(fruit, -1, Integer::sum) == 0) {
                    count.remove(fruit);
                }
                ++left;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}
