import java.util.ArrayList;
import java.util.List;

class Solution {

    public int kthFactor(int n, int k) {
        List<Integer> small = new ArrayList<>();
        int i = 1;
        while ((long) i * i <= n) {
            if (n % i == 0) {
                small.add(i);
                if (small.size() == k) {
                    return i;
                }
            }
            i++;
        }
        int count = small.size();
        boolean perfectSquare = (i - 1) * (i - 1) == n && n % (i - 1) == 0;
        int total = perfectSquare ? 2 * count - 1 : 2 * count;
        if (k > total) {
            return -1;
        }
        return n / small.get(total - k);
    }
}
