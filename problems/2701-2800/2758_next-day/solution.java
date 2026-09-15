import java.time.LocalDate;

class Solution {

    public String nextDay(String date) {
        // The engine owns the calendar: plusDays(1) on the parsed date
        // renormalizes month lengths, leap years, and the year boundary,
        // and LocalDate's toString() prints the result already zero-padded
        // as "YYYY-MM-DD".
        return LocalDate.parse(date).plusDays(1).toString();
    }
}
