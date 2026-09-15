function isPathCrossing(path: string): boolean {
    let x = 0,
        y = 0;
    const visited = new Set<string>(["0,0"]);
    for (const step of path) {
        if (step === "N") {
            y++;
        } else if (step === "S") {
            y--;
        } else if (step === "E") {
            x++;
        } else {
            x--;
        }
        const key = `${x},${y}`;
        if (visited.has(key)) {
            return true;
        }
        visited.add(key);
    }
    return false;
}
