import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public String[] validateCoupons(String[] code, String[] businessLine, boolean[] isActive) {
        // Category rank: electronics < grocery < pharmacy < restaurant.
        Map<String, Integer> rank = new HashMap<>();
        rank.put("electronics", 0);
        rank.put("grocery", 1);
        rank.put("pharmacy", 2);
        rank.put("restaurant", 3);

        List<String[]> valid = new ArrayList<>();
        for (int i = 0; i < code.length; ++i) {
            if (!isActive[i] || !rank.containsKey(businessLine[i])) continue;
            if (!codeOk(code[i])) continue;
            valid.add(new String[] { businessLine[i], code[i] });
        }
        // Sort by (category rank, code); the code tiebreak is plain
        // lexicographic string order.
        valid.sort((a, b) -> {
            int byRank = rank.get(a[0]) - rank.get(b[0]);
            if (byRank != 0) return byRank;
            return a[1].compareTo(b[1]);
        });
        String[] answer = new String[valid.size()];
        for (int i = 0; i < valid.size(); ++i) answer[i] = valid.get(i)[1];
        return answer;
    }

    private boolean codeOk(String name) {
        if (name.isEmpty()) return false;
        for (int i = 0; i < name.length(); ++i) {
            char c = name.charAt(i);
            boolean alnum = ('a' <= c && c <= 'z') || ('A' <= c && c <= 'Z') || ('0' <= c && c <= '9');
            if (!alnum && c != '_') return false;
        }
        return true;
    }
}
