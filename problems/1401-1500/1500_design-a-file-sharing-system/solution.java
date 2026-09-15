import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.Set;

class FileSharing {

    private final Map<Integer, Set<Integer>> chunks = new HashMap<>();
    private final Set<Integer> alive = new HashSet<>();
    private final PriorityQueue<Integer> freed = new PriorityQueue<>();
    private int nextId = 1;

    public FileSharing(int m) {}

    public int join(int[] ownedChunks) {
        int uid;
        if (!freed.isEmpty()) {
            uid = freed.poll();
        } else {
            uid = nextId++;
        }
        Set<Integer> set = new HashSet<>();
        for (int c : ownedChunks) {
            set.add(c);
        }
        chunks.put(uid, set);
        alive.add(uid);
        return uid;
    }

    public void leave(int userID) {
        chunks.remove(userID);
        alive.remove(userID);
        freed.offer(userID);
    }

    public int[] request(int userID, int chunkID) {
        List<Integer> owners = new ArrayList<>();
        for (int uid : alive) {
            if (chunks.get(uid).contains(chunkID)) {
                owners.add(uid);
            }
        }
        Collections.sort(owners);
        if (!owners.isEmpty()) {
            chunks.get(userID).add(chunkID);
        }
        int[] result = new int[owners.size()];
        for (int i = 0; i < result.length; i++) {
            result[i] = owners.get(i);
        }
        return result;
    }
}
