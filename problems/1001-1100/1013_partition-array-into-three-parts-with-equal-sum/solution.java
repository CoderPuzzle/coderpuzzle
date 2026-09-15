class Solution {

    public boolean canThreePartsEqualSum(int[] arr) {
        // If the total isn't a multiple of 3, no equal three-way split can
        // exist. Otherwise each part must sum to target = total / 3.
        int total = 0;
        for (int value : arr) {
            total += value;
        }
        if (total % 3 != 0) {
            return false;
        }
        int target = total / 3;
        // Scan for two target-sum boundaries, stopping before the last
        // index so at least one element is always left for the third part.
        // Once total == 3 * target, whatever remains after two hits is
        // guaranteed to sum to target too, so it never needs scanning.
        int count = 0;
        int running = 0;
        for (int i = 0; i < arr.length - 1; i++) {
            running += arr[i];
            if (running == target) {
                count++;
                running = 0;
                if (count == 2) {
                    return true;
                }
            }
        }
        return false;
    }
}
