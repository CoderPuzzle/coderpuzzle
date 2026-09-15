function processQueries(queries: number[], m: number): number[] {
    const p: number[] = [];
    for (let value = 1; value <= m; value++) {
        p.push(value);
    }
    const result: number[] = [];
    for (const q of queries) {
        const pos = p.indexOf(q);
        result.push(pos);
        p.splice(pos, 1);
        p.unshift(q);
    }
    return result;
}
