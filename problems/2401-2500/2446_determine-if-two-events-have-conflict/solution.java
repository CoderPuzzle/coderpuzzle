class Solution {

    public boolean haveConflict(String[] event1, String[] event2) {
        // Each "HH:MM" is one minute-of-day integer, so each event is an
        // inclusive integer interval. Two inclusive intervals intersect
        // exactly when neither starts after the other ends.
        int start1 = minutes(event1[0]);
        int end1 = minutes(event1[1]);
        int start2 = minutes(event2[0]);
        int end2 = minutes(event2[1]);
        return start1 <= end2 && start2 <= end1;
    }

    private static int minutes(String time) {
        return Integer.parseInt(time.substring(0, 2)) * 60 + Integer.parseInt(time.substring(3));
    }
}
