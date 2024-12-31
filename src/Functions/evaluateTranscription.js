// export function evaluateTranscription(transcription, scripture) {
//     const normalize = (str) => 
//         str.replace(/[^a-z0-9\s]/gi, '').toLowerCase().split(/\s+/);
    
//     const transcriptWords = normalize(transcription);
//     const scriptureWords = scripture.split(/\s+/); // Keep original punctuation and case

//     let correctedString = '';
//     let correctCount = 0;
//     let transcriptIndex = 0;

//     scriptureWords.forEach((word) => {
//         const cleanWord = word.replace(/[^a-z0-9]/gi, '').toLowerCase();
//         const transcriptWord = transcriptWords[transcriptIndex];
        
//         if (transcriptWord === cleanWord) {
//             correctedString += word + ' ';
//             correctCount++;
//             transcriptIndex++;
//         } else if (transcriptWord) {
//             correctedString += `<span style="color:red">${scriptureWords[transcriptIndex]}</span> `;
//             transcriptIndex++;
//         } else {
//             correctedString += '_ ';
//         }
//     });

//     const accuracy = ((correctCount / scriptureWords.length) * 100).toFixed(2);
//     return {
//         correctedString: correctedString.trim(),
//         accuracy: `${correctCount}/${scriptureWords.length} (${accuracy}%)`
//     };
// }

// export function evaluateTranscription(transcription, scripture) {
//     const normalize = (str) => 
//         str.replace(/[^a-z0-9\s]/gi, '').toLowerCase().split(/\s+/);
    
//     const transcriptWords = normalize(transcription);
//     const scriptureWords = normalize(scripture);
//     const originalWords = transcription.split(/\s+/);  // Preserve original casing & punctuation
    
//     let correctedString = [];
//     let transcriptIndex = 0;
//     let correctCount = 0;

//     scriptureWords.forEach((word, index) => {
//         const transcriptWord = transcriptWords[transcriptIndex];

//         if (transcriptWord === word) {
//             correctedString.push(<span>{originalWords[transcriptIndex]} </span>);
//             correctCount++;
//             transcriptIndex++;
//         } else if (transcriptWord) {
//             correctedString.push(
//                 <span style={{ color: 'red' }}>{originalWords[transcriptIndex]} </span>
//             );
//             transcriptIndex++;
//         } else {
//             correctedString.push(<span>_ </span>);
//         }
//     });

//     // Add remaining transcription words that have no match in scripture
//     while (transcriptIndex < originalWords.length) {
//         correctedString.push(
//             <span style={{ color: 'red' }}>{originalWords[transcriptIndex]} </span>
//         );
//         transcriptIndex++;
//     }

//     // Calculate accuracy
//     const accuracy = `Accuracy: ${(correctCount / scriptureWords.length) * 100}%`;

//     return { correctedString, accuracy: accuracy };
// }

export function evaluateTranscription(transcription, scripture) {

    console.log(transcription);
    console.log(scripture)

    const normalize = (str) => str.replace(/[^a-z0-9\s]/gi, '').toLowerCase().split(/\s+/);

    const transcriptWords = normalize(transcription);
    const scriptureWords = normalize(scripture);

    console.log(transcriptWords);
    console.log(scriptureWords);

    const originalWords = transcription.split(/\s+/);

    //built output string
    let correctedString = [];

    //track index position in transcript
    let transcriptIndex = 0;

    let correctCount = 0;

    // let usedScriptureWords = new Set();

    //for each word in list of original scripture words
    scriptureWords.forEach((word) => {

        //current transcript word to compare against scripture word
        const transcriptWord = transcriptWords[transcriptIndex];

        if (transcriptWord === word) {
            correctedString.push(`${originalWords[transcriptIndex]} `);
            correctCount++;
            transcriptIndex++;
        } else if (scriptureWords.includes(word)) {
            correctedString.push(
                <span style={{ color: 'yellow' }}>{originalWords[transcriptIndex]} </span>
            );
            transcriptIndex++;
        } else if (transcriptWord) {
            correctedString.push(
                <span style={{ color: 'red' }}>{originalWords[transcriptIndex]} </span>
            );
            transcriptIndex++;
        } else {
            correctedString.push("___ ");
        }
    });

    // if the transcript is longer than scripture, make remaining words red
    while (transcriptIndex < transcriptWords.length) {
        correctedString.push(
            <span style={{ color: 'red' }}>{originalWords[transcriptIndex]} </span>
        );
        transcriptIndex++;
    }

    // If transcript is shorter than scripture, push empty words to string
    while (correctedString.length < scriptureWords.length) {
        correctedString.push("___ ");
    }

    const accuracy = `Accuracy: ${(correctCount / scriptureWords.length) * 100}%`;

    return { correctedString, accuracy };
}


