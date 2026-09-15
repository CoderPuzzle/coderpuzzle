import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

class Solution {

    private int k;
    private int[] tree;

    public int[] busiestServers(int k, int[] arrival, int[] load) {
        this.k = k;
        this.tree = new int[k + 1];
        for (int server = 0; server < k; server++) {
            update(server, 1);
        }

        int n = arrival.length;
        int[] counts = new int[k];
        PriorityQueue<long[]> heap = new PriorityQueue<>((a, b) -> Long.compare(a[0], b[0]));

        for (int i = 0; i < n; i++) {
            long startTime = arrival[i];
            while (!heap.isEmpty() && heap.peek()[0] <= startTime) {
                long[] freed = heap.poll();
                update((int) freed[1], 1);
            }

            int totalFree = query(k);
            if (totalFree == 0) {
                continue;
            }

            int start = i % k;
            int beforeStart = query(start);
            int server;
            if (beforeStart < totalFree) {
                server = findKth(beforeStart + 1);
            } else {
                server = findKth(1);
            }

            update(server, -1);
            counts[server]++;
            heap.offer(new long[] { startTime + load[i], server });
        }

        int busiest = 0;
        for (int count : counts) {
            busiest = Math.max(busiest, count);
        }
        List<Integer> result = new ArrayList<>();
        for (int server = 0; server < k; server++) {
            if (counts[server] == busiest) {
                result.add(server);
            }
        }
        int[] answer = new int[result.size()];
        for (int i = 0; i < answer.length; i++) {
            answer[i] = result.get(i);
        }
        return answer;
    }

    private void update(int server, int delta) {
        int i = server + 1;
        while (i <= k) {
            tree[i] += delta;
            i += i & -i;
        }
    }

    private int query(int count) {
        int sum = 0;
        int i = count;
        while (i > 0) {
            sum += tree[i];
            i -= i & -i;
        }
        return sum;
    }

    private int findKth(int rank) {
        int pos = 0;
        int pw = 1;
        while (pw * 2 <= k) {
            pw *= 2;
        }
        while (pw > 0) {
            if (pos + pw <= k && tree[pos + pw] < rank) {
                pos += pw;
                rank -= tree[pos];
            }
            pw /= 2;
        }
        return pos;
    }
}
