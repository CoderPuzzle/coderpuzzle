function findAllRecipes(recipes: string[], ingredients: string[][], supplies: string[]): string[] {
    const have = new Set(supplies);
    const index = new Map<string, number>();
    for (let i = 0; i < recipes.length; i++) {
        index.set(recipes[i], i);
    }
    const n = recipes.length;
    const dependents: number[][] = Array.from({ length: n }, () => []);
    const indegree: number[] = new Array(n).fill(0);
    const impossible: boolean[] = new Array(n).fill(false);
    for (let i = 0; i < n; i++) {
        const seen = new Set<number>();
        for (const item of ingredients[i]) {
            // An initial supply satisfies the requirement outright.
            if (have.has(item)) {
                continue;
            }
            const j = index.get(item);
            if (j === undefined) {
                // Neither supply nor recipe: never makeable.
                impossible[i] = true;
            } else if (!seen.has(j)) {
                // seen dedupes repeated ingredients so the indegree counts
                // each recipe dependency once.
                seen.add(j);
                indegree[i]++;
                dependents[j].push(i);
            }
        }
    }

    // Kahn's algorithm: recipes needing nothing beyond the supplies start
    // made; cycles never reach indegree zero and drop out automatically.
    const queue: number[] = [];
    for (let i = 0; i < n; i++) {
        if (indegree[i] === 0 && !impossible[i]) {
            queue.push(i);
        }
    }
    const made: string[] = [];
    for (let head = 0; head < queue.length; head++) {
        const i = queue[head];
        made.push(recipes[i]);
        for (const j of dependents[i]) {
            // Skip impossible recipes so their failure never blocks or
            // corrupts the rest.
            if (impossible[j]) {
                continue;
            }
            indegree[j]--;
            if (indegree[j] === 0) {
                queue.push(j);
            }
        }
    }
    return made.sort();
}
