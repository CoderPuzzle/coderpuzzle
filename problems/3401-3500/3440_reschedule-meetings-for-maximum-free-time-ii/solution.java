class Solution {

    public int maxFreeTime(int eventTime, int[] startTime, int[] endTime) {
        // Removing meeting i frees the span between its neighbours, which is
        // g[i] + d + g[i+1] long with g the gaps around it. If i fits into a
        // gap OTHER than its two flanking ones, that whole span becomes free
        // time; otherwise i can only slide inside it, leaving g[i] + g[i+1]
        // free. Prefix/suffix maxima over the gap array make "largest
        // non-flanking gap" an O(1) lookup, so the scan stays linear.
        int n = startTime.length;
        int[] gaps = new int[n + 1];
        gaps[0] = startTime[0];
        for (int i = 1; i < n; ++i) gaps[i] = startTime[i] - endTime[i - 1];
        gaps[n] = eventTime - endTime[n - 1];
        int[] prefix = new int[n + 2];
        for (int i = 0; i <= n; ++i) prefix[i + 1] = Math.max(prefix[i], gaps[i]);
        int[] suffix = new int[n + 2];
        for (int i = n; i >= 0; --i) suffix[i] = Math.max(suffix[i + 1], gaps[i]);
        int answer = 0;
        for (int gap : gaps) answer = Math.max(answer, gap);
        for (int i = 0; i < n; ++i) {
            int duration = endTime[i] - startTime[i];
            // Largest gap outside i's two flanking gaps decides move vs slide.
            int host = Math.max(prefix[i], suffix[i + 2]);
            int merged = gaps[i] + gaps[i + 1];
            answer = Math.max(answer, host >= duration ? merged + duration : merged);
        }
        return answer;
    }
}
