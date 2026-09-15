import java.util.*;

class Solution {

    // In sorted order a prefix relationship must surface between
    // neighbors: the shorter prefix sorts first, and anything landing
    // between them shares that prefix as well.
    public boolean phonePrefix(String[] numbers) {
        Arrays.sort(numbers);
        for (int i = 0; i + 1 < numbers.length; i++) {
            if (numbers[i + 1].startsWith(numbers[i])) {
                return false;
            }
        }
        return true;
    }
}
