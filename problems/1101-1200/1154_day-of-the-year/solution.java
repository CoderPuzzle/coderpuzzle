class Solution {

    public int dayOfYear(String date) {
        int year = Integer.parseInt(date.substring(0, 4));
        int month = Integer.parseInt(date.substring(5, 7));
        int day = Integer.parseInt(date.substring(8, 10));
        int[] days = { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
        // Gregorian leap rule: div by 4, except centuries, except 400.
        boolean leap = year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
        if (leap) days[1] = 29;
        int total = day;
        for (int m = 0; m < month - 1; ++m) total += days[m];
        return total;
    }
}
