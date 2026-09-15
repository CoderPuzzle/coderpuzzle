// Rooms are nodes and keys are one-way edges, so the rooms that can ever be
// entered are exactly those reachable from room 0. An explicit stack floods
// the key graph; the answer compares marked rooms to n.
function canVisitAllRooms(rooms: number[][]): boolean {
    const seen: boolean[] = new Array(rooms.length).fill(false);
    seen[0] = true;
    const stack: number[] = [0];
    let visited = 1;
    for (let top = 0; top < stack.length; ++top) {
        const room = stack[top];
        for (const key of rooms[room]) {
            if (seen[key]) {
                continue;
            }
            seen[key] = true;
            ++visited;
            stack.push(key);
        }
    }
    return visited === rooms.length;
}
