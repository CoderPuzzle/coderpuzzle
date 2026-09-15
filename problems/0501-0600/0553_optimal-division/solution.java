import java.util.ArrayList;
import java.util.List;

class Solution {

    public String optimalDivision(int[] nums) {
        // One or two values leave nothing to regroup, so the bare
        // left-to-right join is the whole answer. From three on, every value
        // is positive and the expression is maximized by dividing nums[0] by
        // the smallest possible denominator — the flat chain
        // a1/a2/.../an-1 = a1/(a2*...*an-1), which pulls every later value
        // into that denominator's numerator.
        List<String> parts = new ArrayList<>();
        for (int value : nums) {
            parts.add(Integer.toString(value));
        }
        if (parts.size() <= 2) {
            return String.join("/", parts);
        }
        return parts.get(0) + "/(" + String.join("/", parts.subList(1, parts.size())) + ")";
    }
}
