import java.util.HashMap;
import java.util.Map;

class Solution {

    private static final Map<String, String> MONTHS = new HashMap<>();

    static {
        MONTHS.put("Jan", "01");
        MONTHS.put("Feb", "02");
        MONTHS.put("Mar", "03");
        MONTHS.put("Apr", "04");
        MONTHS.put("May", "05");
        MONTHS.put("Jun", "06");
        MONTHS.put("Jul", "07");
        MONTHS.put("Aug", "08");
        MONTHS.put("Sep", "09");
        MONTHS.put("Oct", "10");
        MONTHS.put("Nov", "11");
        MONTHS.put("Dec", "12");
    }

    public String reformatDate(String date) {
        String[] parts = date.split(" ");
        String dayStr = parts[0];
        String monthStr = parts[1];
        String yearStr = parts[2];

        // Every ordinal suffix (st/nd/rd/th) is exactly two letters, so
        // dropping the last two characters always leaves the bare digits.
        String day = dayStr.substring(0, dayStr.length() - 2);
        if (day.length() == 1) {
            day = "0" + day;
        }
        String month = MONTHS.get(monthStr);

        return yearStr + "-" + month + "-" + day;
    }
}
