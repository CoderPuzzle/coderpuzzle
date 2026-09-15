class DataStream {

    // Running length of the current suffix of matched values: a match
    // grows it, any other number resets it to zero, and consec is just
    // "has the streak reached k". The window of the last k integers is
    // summarized in one integer — nothing is buffered.
    private final int value;
    private final int k;
    private int streak;

    public DataStream(int value, int k) {
        this.value = value;
        this.k = k;
    }

    public boolean consec(int num) {
        streak = num == value ? streak + 1 : 0;
        return streak >= k;
    }
}
