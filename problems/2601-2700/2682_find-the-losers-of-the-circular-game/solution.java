class Solution {

    public int[] circularGameLosers(int n, int k) {
        // Straight simulation: friend 1 holds the ball at the start, and each
        // turn i moves the holder i*k seats clockwise. At most n turns pass
        // before some friend receives the ball twice; i*k <= 2500 so int
        // arithmetic never overflows.
        boolean[] received = new boolean[n];
        received[0] = true;
        int holder = 0;
        int turn = 1;
        while (true) {
            holder = (holder + turn * k) % n;
            if (received[holder]) {
                break;
            }
            received[holder] = true;
            turn++;
        }
        int loserCount = 0;
        for (boolean got : received) {
            if (!got) {
                loserCount++;
            }
        }
        int[] answer = new int[loserCount];
        int idx = 0;
        for (int friend = 0; friend < n; friend++) {
            if (!received[friend]) {
                answer[idx++] = friend + 1;
            }
        }
        return answer;
    }
}
