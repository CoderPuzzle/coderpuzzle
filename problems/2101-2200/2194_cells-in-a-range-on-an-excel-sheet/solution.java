import java.util.ArrayList;
import java.util.List;

class Solution {

    public List<String> cellsInRange(String s) {
        // Columns outer, rows inner produces exactly the required order.
        List<String> out = new ArrayList<>();
        for (char col = s.charAt(0); col <= s.charAt(3); ++col) {
            for (char row = s.charAt(1); row <= s.charAt(4); ++row) {
                out.add("" + col + row);
            }
        }
        return out;
    }
}
