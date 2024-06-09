function getCommonWord(s1: string, s2: string) {
	let max_length = 0
	let end_index = 0
	const len1 = s1.length
	const len2 = s2.length
	const ar: number[][] = Array.from({length: len1 + 1}, () => Array(len2 + 1).fill(0))

	for (let i = 1; i <= len1; i++) {
		for (let j = 1; j <= len2; j++) {
			if (s1[i - 1] == s2[j - 1]) {
				ar[i][j] = ar[i - 1][j - 1] + 1
				if (ar[i][j] > max_length) {
					max_length = ar[i][j]
					end_index = i
				}
			}
		}
	}

	return s1.slice(end_index - max_length, end_index)
}

function getQuestionPart(phrases:string[]):string[] {
	let common_word = getCommonWord(phrases[0], phrases[1])
	for (let i = 1; i < phrases.length; i++)
		common_word = getCommonWord(phrases[i], common_word)
	return phrases.map(phrase => phrase.replace(common_word, ""))
}

// console.log(getQuestionPart(["hell", "hello", "el"]))
// console.log(getQuestionPart(["hell", "hello", ""]))
// console.log(getQuestionPart(["HANDSHAKE", "HEADSHAKE", "EARTHQUAKE"]));
// console.log(getQuestionPart(["GOODBOYS", "TASTEGOOD", "GOGOODGOD"]));