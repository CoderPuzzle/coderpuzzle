# Count in one awk pass and sort only the distinct words: awk splits each
# record into fields, aggregates them in an associative array while the
# input streams, and the END block emits "word count" lines that one
# numeric sort puts in descending order.
awk '{ for (i = 1; i <= NF; i++) count[$i]++ }
END { for (word in count) print word, count[word] }' | sort -k2,2nr
