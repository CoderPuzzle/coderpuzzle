class Solution {

    public String nextDay(String date) {
        // Hand-rolled: parse the three fields, step the day-of-month, and
        // roll over through a days-in-month table — February widened to 29
        // on leap years (divisible by 4, except centuries unless divisible
        // by 400), December's overflow carrying into the next year.
        // String.format zero-pads month and day to two digits and the year
        // to four, so the result is exactly "YYYY-MM-DD".
        int year = Integer.parseInt(date.substring(0, 4));
        int month = Integer.parseInt(date.substring(5, 7));
        int day = Integer.parseInt(date.substring(8, 10));
        boolean leap = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
        int[] monthLengths = { 31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
        int nextYear = year;
        int nextMonth = month;
        int nextDayOfMonth = day + 1;
        if (nextDayOfMonth > monthLengths[month - 1]) {
            nextDayOfMonth = 1;
            nextMonth += 1;
            if (nextMonth > 12) {
                nextMonth = 1;
                nextYear += 1;
            }
        }
        return String.format("%04d-%02d-%02d", nextYear, nextMonth, nextDayOfMonth);
    }
}
