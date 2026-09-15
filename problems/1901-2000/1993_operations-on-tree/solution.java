import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class LockingTree {

    // Owner per node (-1 = unlocked) plus children adjacency built from
    // the parent array; upgrade enumerates descendants with an explicit
    // stack so a 2000-node chain is never recursed into.
    private final int[] parent;
    private final int[] owner;
    private final List<List<Integer>> children;

    public LockingTree(int[] parent) {
        this.parent = parent;
        this.owner = new int[parent.length];
        Arrays.fill(owner, -1);
        this.children = new ArrayList<>();
        for (int i = 0; i < parent.length; i++) {
            children.add(new ArrayList<>());
        }
        for (int node = 1; node < parent.length; node++) {
            children.get(parent[node]).add(node);
        }
    }

    public boolean lock(int num, int user) {
        if (owner[num] != -1) {
            return false;
        }
        owner[num] = user;
        return true;
    }

    public boolean unlock(int num, int user) {
        if (owner[num] != user) {
            return false;
        }
        owner[num] = -1;
        return true;
    }

    public boolean upgrade(int num, int user) {
        // Condition 1: the node itself must be unlocked.
        if (owner[num] != -1) {
            return false;
        }
        // Condition 3: no ancestor may be locked.
        int node = parent[num];
        while (node != -1) {
            if (owner[node] != -1) {
                return false;
            }
            node = parent[node];
        }
        // Condition 2: at least one locked descendant. Collect every
        // descendant iteratively so the check and the later unlock share
        // one traversal.
        List<Integer> descendants = new ArrayList<>();
        List<Integer> stack = new ArrayList<>(children.get(num));
        boolean hasLocked = false;
        while (!stack.isEmpty()) {
            node = stack.remove(stack.size() - 1);
            descendants.add(node);
            if (owner[node] != -1) {
                hasLocked = true;
            }
            stack.addAll(children.get(node));
        }
        if (!hasLocked) {
            return false;
        }
        owner[num] = user;
        for (int descendant : descendants) {
            owner[descendant] = -1;
        }
        return true;
    }
}
