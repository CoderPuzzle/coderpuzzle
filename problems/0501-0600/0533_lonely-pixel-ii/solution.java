import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int findBlackPixel(String[][] picture, int target) {
        // Rule 2 asks every row carrying a black pixel in column c to be an
        // exact copy of row r, so rows only interact through their content:
        // identical rows form a class keyed by the joined row string.
        int m = picture.length;
        int n = picture[0].length;
        Map<String, Integer> classOfKey = new HashMap<>();
        List<Integer> classRowCount = new ArrayList<>();
        int[] rowClass = new int[m];
        int[] colCount = new int[n];
        for (int i = 0; i < m; i++) {
            String key = String.join("", picture[i]);
            if (!classOfKey.containsKey(key)) {
                classOfKey.put(key, classRowCount.size());
                classRowCount.add(countBlacks(picture[i]));
            }
            rowClass[i] = classOfKey.get(key);
            for (int j = 0; j < n; j++) {
                if (picture[i][j].equals("B")) colCount[j]++;
            }
        }
        // blacks[j][k]: how many black cells column j carries from class k.
        int classes = classRowCount.size();
        int[][] blacks = new int[n][classes];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (picture[i][j].equals("B")) blacks[j][rowClass[i]]++;
            }
        }
        // A column pays out exactly target pixels when its target blacks all
        // come from one class (rule 2) whose rows hold target blacks (rule 1).
        int total = 0;
        for (int j = 0; j < n; j++) {
            if (colCount[j] != target) continue;
            for (int k = 0; k < classes; k++) {
                if (blacks[j][k] == target && classRowCount.get(k) == target) total += target;
            }
        }
        return total;
    }

    private int countBlacks(String[] row) {
        int blacks = 0;
        for (String cell : row) {
            if (cell.equals("B")) blacks++;
        }
        return blacks;
    }
}
