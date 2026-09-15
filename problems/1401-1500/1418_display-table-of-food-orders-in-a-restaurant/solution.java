import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;
import java.util.TreeSet;

class Solution {

    public String[][] displayTable(String[][] orders) {
        Map<String, Map<String, Integer>> counts = new HashMap<>();
        TreeSet<String> foods = new TreeSet<>();
        for (String[] order : orders) {
            String table = order[1];
            String food = order[2];
            foods.add(food);
            counts.computeIfAbsent(table, key -> new HashMap<>()).merge(food, 1, Integer::sum);
        }
        TreeMap<Integer, String> tablesByNumber = new TreeMap<>();
        for (String table : counts.keySet()) {
            tablesByNumber.put(Integer.parseInt(table), table);
        }
        String[] sortedFoods = foods.toArray(new String[0]);
        String[][] grid = new String[tablesByNumber.size() + 1][];
        grid[0] = new String[sortedFoods.length + 1];
        grid[0][0] = "Table";
        for (int i = 0; i < sortedFoods.length; i++) {
            grid[0][i + 1] = sortedFoods[i];
        }
        int rowIndex = 1;
        for (String table : tablesByNumber.values()) {
            Map<String, Integer> row = counts.get(table);
            grid[rowIndex] = new String[sortedFoods.length + 1];
            grid[rowIndex][0] = table;
            for (int i = 0; i < sortedFoods.length; i++) {
                grid[rowIndex][i + 1] = String.valueOf(row.getOrDefault(sortedFoods[i], 0));
            }
            rowIndex++;
        }
        return grid;
    }
}
