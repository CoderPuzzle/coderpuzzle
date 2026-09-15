function secondsBetweenTimes(startTime: string, endTime: string): number {
    const seconds = (value: string) =>
        Number(value.slice(0, 2)) * 3600 + Number(value.slice(3, 5)) * 60 + Number(value.slice(6, 8));
    return seconds(endTime) - seconds(startTime);
}
