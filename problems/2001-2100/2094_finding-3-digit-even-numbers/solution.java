import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] findEvenNumbers(int[] digits) {
        int[] available = new int[10];
        for (int digit : digits) {
            available[digit]++;
        }

        List<Integer> answer = new ArrayList<>();
        for (int number = 100; number < 1000; number += 2) {
            int[] needed = new int[10];
            needed[number / 100]++;
            needed[(number / 10) % 10]++;
            needed[number % 10]++;
            boolean possible = true;
            for (int digit = 0; digit < 10; digit++) {
                if (needed[digit] > available[digit]) {
                    possible = false;
                    break;
                }
            }
            if (possible) {
                answer.add(number);
            }
        }
        return answer.stream().mapToInt(Integer::intValue).toArray();
    }
}
