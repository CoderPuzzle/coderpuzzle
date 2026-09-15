class Solution {

    public int countDaysTogether(String arriveAlice, String leaveAlice, String arriveBob, String leaveBob) {
        // Month lengths of a non-leap year, turned into "days before month
        // m" so any "MM-DD" maps to one day-of-year integer.
        int[] monthDays = { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
        int[] monthStart = new int[12];
        for (int month = 1; month < 12; ++month) {
            monthStart[month] = monthStart[month - 1] + monthDays[month - 1];
        }

        // Both stays are now integer intervals; the shared days are their
        // inclusive intersection, empty exactly when the bounds cross.
        int arrival = Math.max(dayOfYear(arriveAlice, monthStart), dayOfYear(arriveBob, monthStart));
        int departure = Math.min(dayOfYear(leaveAlice, monthStart), dayOfYear(leaveBob, monthStart));
        return Math.max(0, departure - arrival + 1);
    }

    private int dayOfYear(String date, int[] monthStart) {
        int month = Integer.parseInt(date.substring(0, 2));
        int day = Integer.parseInt(date.substring(3));
        return monthStart[month - 1] + day;
    }
}
