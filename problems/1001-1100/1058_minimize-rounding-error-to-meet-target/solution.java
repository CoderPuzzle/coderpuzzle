import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {

    public String minimizeError(String[] prices, int target) {
        // Work entirely in integer thousandths so nothing ever touches a
        // float: "1.500" splits into an integer part (the floor) and a
        // 3-digit fractional part (in [0, 1000)).
        long sumFloors = 0;
        List<Integer> fracs = new ArrayList<>();
        for (String price : prices) {
            int dot = price.indexOf('.');
            int floorVal = Integer.parseInt(price.substring(0, dot));
            int fracVal = Integer.parseInt(price.substring(dot + 1));
            sumFloors += floorVal;
            if (fracVal != 0) {
                fracs.add(fracVal);
            }
        }

        int countNonint = fracs.size();
        long sumCeils = sumFloors + countNonint;
        if (target < sumFloors || target > sumCeils) {
            return "-1";
        }

        // Flooring everything reaches sumFloors; each fractional price
        // switched to its ceiling adds exactly 1, so exactly k of them
        // must switch.
        int k = (int) (target - sumFloors);

        // Switching a price with fractional part f changes its error
        // contribution from f to (1000 - f): cheapest for the largest f.
        // Flip the k largest fractions first.
        long baseError = 0;
        for (int f : fracs) {
            baseError += f;
        }
        Collections.sort(fracs, Collections.reverseOrder());
        long sumFlip = 0;
        for (int i = 0; i < k; i++) {
            sumFlip += fracs.get(i);
        }
        long totalError = baseError + (long) k * 1000 - 2 * sumFlip;

        return String.format("%d.%03d", totalError / 1000, totalError % 1000);
    }
}
