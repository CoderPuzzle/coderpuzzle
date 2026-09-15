function leastBricks(wall: number[][]): number {
    const edgeCounts = new Map<number, number>();
    // Flip the question: a line at position p crosses a row unless that
    // row has a brick edge at p, so count edges per position.
    for (const row of wall) {
        let position = 0;
        // Prefix sums excluding the last brick: the final cumulative
        // width is the wall's right border, which is forbidden.
        for (let i = 0; i < row.length - 1; i++) {
            position += row[i];
            edgeCounts.set(position, (edgeCounts.get(position) || 0) + 1);
        }
    }
    // Rows minus the most-shared edge position; 0 covers walls where
    // every row is a single brick.
    let bestEdges = 0;
    for (const count of edgeCounts.values()) {
        if (count > bestEdges) {
            bestEdges = count;
        }
    }
    return wall.length - bestEdges;
}
