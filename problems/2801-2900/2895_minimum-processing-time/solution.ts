function minProcessingTime(processorTime: number[], tasks: number[]): number {
    const procs = [...processorTime].sort((a, b) => a - b);
    const tasksDesc = [...tasks].sort((a, b) => b - a);
    let answer = 0;
    for (let i = 0; i < tasksDesc.length; ++i) {
        answer = Math.max(answer, procs[Math.floor(i / 4)] + tasksDesc[i]);
    }
    return answer;
}
