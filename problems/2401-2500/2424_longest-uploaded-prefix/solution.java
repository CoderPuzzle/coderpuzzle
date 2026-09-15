class LUPrefix {

    // Uploaded marks in a boolean array plus a prefix pointer that only
    // moves forward. upload() sets one mark; longest() advances the
    // pointer while the next video is already uploaded. The pointer
    // never retreats, so its total travel across all calls is bounded
    // by n and every query is amortized constant.
    private final boolean[] uploaded;
    private final int n;
    private int prefix;

    public LUPrefix(int n) {
        this.n = n;
        this.uploaded = new boolean[n + 1];
    }

    public void upload(int video) {
        uploaded[video] = true;
    }

    public int longest() {
        while (prefix < n && uploaded[prefix + 1]) {
            prefix++;
        }
        return prefix;
    }
}
