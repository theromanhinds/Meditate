const functions = require('firebase-functions');
const axios = require('axios');

exports.getScripture = functions.https.onRequest(async (req, res) => {
  const { bookId, chapter, startingVerse, endingVerse } = req.query;
  try {
    const response = await axios.get(`https://bible-go-api.rkeplin.com/v1/books/${bookId}/chapters/${chapter}?translation=NIV`);

    if (startingVerse === endingVerse) {
        const verse = response.data[startingVerse-1].verse;
        res.type('text/plain').send(verse);
    } else {
        let verse = '';
        for (let i = startingVerse-1; i < endingVerse - 1; i++) {
            verse += response.data[i].verse + " ";
        }
        verse += response.data[endingVerse-1].verse;
        res.send(verse);
    }

  } catch (error) {
    console.error('Error fetching scripture:', error.message);
    res.status(500).json({ error: 'Error fetching scripture' });
  }
});
