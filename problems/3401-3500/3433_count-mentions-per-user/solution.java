import java.util.Arrays;

class Solution {

    // Chronological sweep: order events by timestamp, offline events
    // ahead of messages at the same moment (a status change applies
    // before any message sharing its timestamp). Each user's return
    // time is the offline timestamp + 60; a message at time t sees the
    // user once that return time has passed.
    public int[] countMentions(int numberOfUsers, String[][] events) {
        Arrays.sort(events, (a, b) -> {
            int byTime = Integer.parseInt(a[1]) - Integer.parseInt(b[1]);
            if (byTime != 0) {
                return byTime;
            }
            return (a[0].equals("OFFLINE") ? 0 : 1) - (b[0].equals("OFFLINE") ? 0 : 1);
        });
        int[] mentions = new int[numberOfUsers];
        int[] backAt = new int[numberOfUsers];
        for (String[] event : events) {
            int time = Integer.parseInt(event[1]);
            if (event[0].equals("OFFLINE")) {
                backAt[Integer.parseInt(event[2])] = time + 60;
                continue;
            }
            for (String token : event[2].split(" ")) {
                if (token.equals("ALL")) {
                    for (int user = 0; user < numberOfUsers; user++) {
                        mentions[user]++;
                    }
                } else if (token.equals("HERE")) {
                    for (int user = 0; user < numberOfUsers; user++) {
                        if (backAt[user] <= time) {
                            mentions[user]++;
                        }
                    }
                } else {
                    mentions[Integer.parseInt(token.substring(2))]++;
                }
            }
        }
        return mentions;
    }
}
