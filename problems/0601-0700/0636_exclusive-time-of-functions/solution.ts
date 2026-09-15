function exclusiveTime(n: number, logs: string[]): number[] {
    const res: number[] = new Array(n).fill(0);
    const stack: number[][] = []; // [funcId, resumeTime]
    for (const log of logs) {
        const c1 = log.indexOf(":");
        const c2 = log.indexOf(":", c1 + 1);
        const fid = parseInt(log.slice(0, c1), 10);
        const action = log.slice(c1 + 1, c2);
        const ts = parseInt(log.slice(c2 + 1), 10);
        if (action === "start") {
            if (stack.length > 0) {
                const top = stack[stack.length - 1];
                res[top[0]] += ts - top[1];
            }
            stack.push([fid, ts]);
        } else {
            const top = stack.pop() as number[];
            res[top[0]] += ts - top[1] + 1;
            if (stack.length > 0) {
                stack[stack.length - 1][1] = ts + 1;
            }
        }
    }
    return res;
}
