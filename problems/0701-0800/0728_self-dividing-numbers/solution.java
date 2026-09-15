import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] selfDividingNumbers(int left, int right) {
        // Each candidate is judged on a copy: peeling digits off the tail
        // with %10 and /10 walks the decimal writing from last digit to
        // first while n itself stays intact for the divisibility test. A
        // digit of 0 rejects on sight — it divides nothing, and the
        // statement bars it anyway — and any digit leaving a remainder in
        // n % d rejects too; survivors append in scan order, which is
        // already ascending.
        List<Integer> passing = new ArrayList<>();
        for (int n = left; n <= right; ++n) {
            int m = n;
            boolean ok = true;
            while (m > 0) {
                int d = m % 10;
                if (d == 0 || n % d != 0) {
                    ok = false;
                    break;
                }
                m /= 10;
            }
            if (ok) {
                passing.add(n);
            }
        }
        int[] answer = new int[passing.size()];
        for (int i = 0; i < answer.length; ++i) {
            answer[i] = passing.get(i);
        }
        return answer;
    }
}
