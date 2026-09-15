import java.util.HashMap;
import java.util.Map;

class Solution {

    public String largestWordCount(String[] messages, String[] senders) {
        Map<String, Integer> counts = new HashMap<>();
        for (int index = 0; index < messages.length; index++) {
            int words = messages[index].split(" ").length;
            counts.merge(senders[index], words, Integer::sum);
        }
        String bestSender = "";
        int bestCount = -1;
        for (Map.Entry<String, Integer> entry : counts.entrySet()) {
            int count = entry.getValue();
            String sender = entry.getKey();
            if (count > bestCount || (count == bestCount && sender.compareTo(bestSender) > 0)) {
                bestCount = count;
                bestSender = sender;
            }
        }
        return bestSender;
    }
}
