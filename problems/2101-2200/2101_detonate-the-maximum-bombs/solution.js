var maximumDetonation = function (bombs) {
    const count = bombs.length;
    const graph = Array.from({ length: count }, () => []);
    for (let source = 0; source < count; source++) {
        for (let target = 0; target < count; target++) {
            const dx = bombs[source][0] - bombs[target][0];
            const dy = bombs[source][1] - bombs[target][1];
            const radius = bombs[source][2];
            if (dx * dx + dy * dy <= radius * radius) graph[source].push(target);
        }
    }

    let answer = 0;
    for (let start = 0; start < count; start++) {
        const seen = new Array(count).fill(false);
        seen[start] = true;
        const stack = [start];
        let reached = 0;
        while (stack.length > 0) {
            const source = stack.pop();
            reached++;
            for (const target of graph[source]) {
                if (!seen[target]) {
                    seen[target] = true;
                    stack.push(target);
                }
            }
        }
        answer = Math.max(answer, reached);
    }
    return answer;
};
