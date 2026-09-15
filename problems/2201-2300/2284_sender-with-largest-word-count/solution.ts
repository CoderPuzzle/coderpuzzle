function largestWordCount(messages: string[], senders: string[]): string {
    const counts = new Map<string, number>();
    for (let index = 0; index < messages.length; index++) {
        const words = messages[index].split(" ").length;
        counts.set(senders[index], (counts.get(senders[index]) ?? 0) + words);
    }
    let bestSender = "";
    let bestCount = -1;
    for (const [sender, count] of counts) {
        if (count > bestCount || (count === bestCount && sender > bestSender)) {
            bestCount = count;
            bestSender = sender;
        }
    }
    return bestSender;
}
