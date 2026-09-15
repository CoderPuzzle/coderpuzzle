import java.util.ArrayList;
import java.util.List;

class Solution {

    public String[] simplifiedFractions(int n) {
        List<String> result = new ArrayList<>();
        for (int numer = 1; numer < n; numer++) {
            for (int denom = numer + 1; denom <= n; denom++) {
                if (gcd(numer, denom) == 1) {
                    result.add(numer + "/" + denom);
                }
            }
        }
        return result.toArray(new String[0]);
    }

    private int gcd(int a, int b) {
        while (b != 0) {
            int t = a % b;
            a = b;
            b = t;
        }
        return a;
    }
}
