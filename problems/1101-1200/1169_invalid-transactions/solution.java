import java.util.ArrayList;
import java.util.List;

class Solution {

    public List<String> invalidTransactions(String[] transactions) {
        int n = transactions.length;
        String[][] parsed = new String[n][];
        for (int i = 0; i < n; i++) {
            parsed[i] = transactions[i].split(",");
        }
        boolean[] flags = new boolean[n];
        // An amount over the limit convicts on its own; otherwise the
        // transaction waits for a same-name partner in another city within
        // 60 minutes — which may appear anywhere in the array.
        for (int i = 0; i < n; i++) {
            if (Integer.parseInt(parsed[i][2]) > 1000) {
                flags[i] = true;
                continue;
            }
            for (int j = 0; j < n; j++) {
                if (i == j || !parsed[j][0].equals(parsed[i][0]) || parsed[j][3].equals(parsed[i][3])) {
                    continue;
                }
                if (Math.abs(Integer.parseInt(parsed[i][1]) - Integer.parseInt(parsed[j][1])) <= 60) {
                    flags[i] = true;
                    break;
                }
            }
        }
        List<String> invalid = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            if (flags[i]) {
                invalid.add(transactions[i]);
            }
        }
        return invalid;
    }
}
