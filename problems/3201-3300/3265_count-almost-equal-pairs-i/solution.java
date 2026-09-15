import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {

    public int countPairs(int[] nums) {
        // The family of a value holds every number reachable by
        // exchanging two of its digits at most once, itself included;
        // swapped strings parse back through Integer.parseInt, so
        // leading zeros collapse (30 -> "03" -> 3). A pair qualifies
        // when either side sits in the other's family; one swap may
        // touch one number only, so both directions are tested.
        List<Set<Integer>> families = new ArrayList<>();
        for (int num : nums) {
            char[] digits = Integer.toString(num).toCharArray();
            Set<Integer> reached = new HashSet<>();
            reached.add(num);
            for (int i = 0; i < digits.length; i++) {
                for (int j = i + 1; j < digits.length; j++) {
                    char tmp = digits[i];
                    digits[i] = digits[j];
                    digits[j] = tmp;
                    reached.add(Integer.parseInt(new String(digits)));
                    tmp = digits[i];
                    digits[i] = digits[j];
                    digits[j] = tmp;
                }
            }
            families.add(reached);
        }
        int pairs = 0;
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (families.get(i).contains(nums[j]) || families.get(j).contains(nums[i])) {
                    pairs++;
                }
            }
        }
        return pairs;
    }
}
