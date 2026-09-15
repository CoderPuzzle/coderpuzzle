function garbageCollection(garbage: string[], travel: number[]): number {
    // Every unit costs one pickup minute; each truck drives exactly to
    // the last house holding its type. Track those last indices, then
    // add prefix travel once per type that appears past house 0.
    let minutes = 0;
    const last: Record<string, number> = { M: -1, P: -1, G: -1 };
    for (let i = 0; i < garbage.length; ++i) {
        minutes += garbage[i].length;
        for (const c of garbage[i]) {
            last[c] = i;
        }
    }
    let prefix = 0;
    for (let i = 1; i < garbage.length; ++i) {
        prefix += travel[i - 1];
        for (const t of ["M", "P", "G"]) {
            if (last[t] === i) {
                minutes += prefix;
                last[t] = -1;
            }
        }
    }
    return minutes;
}
