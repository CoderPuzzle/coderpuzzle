class Solution {

    public int daysBetweenDates(String date1, String date2) {
        // Day numbers from a fixed epoch; the answer is their difference.
        return Math.abs(dayNumber(date1) - dayNumber(date2));
    }

    private static int dayNumber(String date) {
        int year = Integer.parseInt(date.substring(0, 4));
        int month = Integer.parseInt(date.substring(5, 7));
        int day = Integer.parseInt(date.substring(8, 10));
        int[] monthLengths = { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
        int total = 0;
        for (int y = 1971; y < year; ++y) {
            total += isLeap(y) ? 366 : 365;
        }
        for (int m = 1; m < month; ++m) {
            total += monthLengths[m - 1];
            if (m == 2 && isLeap(year)) {
                total += 1;
            }
        }
        return total + day - 1;
    }

    private static boolean isLeap(int year) {
        return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
    }
}
