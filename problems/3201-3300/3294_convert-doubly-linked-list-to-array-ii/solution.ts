function toArray(node: DoublyListNode | null): number[] {
    // The `prev` chain walks back to the head; the loop exits standing
    // on it, however deep in the list the handed node was. One forward
    // sweep then reads the values out already in order.
    let head = node;
    while (head !== null && head.prev !== null) {
        head = head.prev;
    }
    const values: number[] = [];
    for (let walk = head; walk !== null; walk = walk.next) {
        values.push(walk.val);
    }
    return values;
}
