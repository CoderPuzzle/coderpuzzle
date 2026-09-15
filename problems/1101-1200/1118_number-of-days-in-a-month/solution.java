class Solution {

    public int numberOfDays(int year, int month) {
        if (month == 2) {
            // Gregorian leap rule: div by 4, except centuries, except 400s.
            boolean leap = year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
            return leap ? 29 : 28;
        }
        // April, June, September, November are the short months; the rest,
        // apart from February handled above, are all 31 days.
        return month == 4 || month == 6 || month == 9 || month == 11 ? 30 : 31;
    }
}
