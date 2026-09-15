/** The immutable-list-node API (problem-provided oracle).
 *
 * Ships with the problem, compiled with every submission by the judge,
 * never editable in the editor: the case's linked list is materialized
 * internally and only the head is handed to the solution — every other
 * node is reachable solely through getNext(). printValue records into an
 * ordered transcript that becomes the judged output. Solvers see only
 * the public API documented in the starter. */
public class ImmutableListNode {

    private int value;
    private ImmutableListNode next;
    private long budget;
    private java.util.List<Integer> transcript;

    // The class declares EXACTLY ONE constructor on purpose: the harness
    // selects an oracle constructor by parameter count alone. The judge
    // calls it with the case's serialized list plus the query budget; the
    // chain is wired here, before any solver code runs.
    public ImmutableListNode(String head, long budget) {
        String trimmed = head == null ? "" : head.trim();
        java.util.List<Integer> parsed = new java.util.ArrayList<>();
        if (!trimmed.isEmpty()) {
            for (String part : trimmed.split(",")) {
                parsed.add(Integer.parseInt(part.trim()));
            }
        }
        this.value = parsed.isEmpty() ? 0 : parsed.get(0);
        this.budget = budget;
        this.transcript = new java.util.ArrayList<>();
        ImmutableListNode tail = null;
        for (int i = parsed.size() - 1; i >= 1; --i) {
            ImmutableListNode node = new ImmutableListNode("0", 0);
            node.value = parsed.get(i);
            node.budget = Long.MAX_VALUE;
            node.transcript = this.transcript;
            node.next = tail;
            tail = node;
        }
        this.next = tail;
    }

    public void printValue() {
        if (budget <= 0) {
            throw new IllegalStateException("ImmutableListNode query budget exhausted");
        }
        budget -= 1;
        transcript.add(value);
    }

    /** Returns the next node, or null past the end of the list. */
    public ImmutableListNode getNext() {
        return next;
    }

    /** The observable effect: the exact sequence of printed values. */
    public java.util.List<Integer> verdict() {
        return new java.util.ArrayList<>(transcript);
    }
}
