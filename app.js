const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

const fileNames = [
    "0.mp4", "1.mp4", "2.mp4", "3.mp4", "4.mp4", "5.mp4", "6.mp4", "7.mp4", "8.mp4", "9.mp4",
    "A.mp4", "After.mp4", "Again.mp4", "Against.mp4", "Age.mp4", "All.mp4", "Alone.mp4", "Also.mp4", "And.mp4", "Ask.mp4",
    "At.mp4", "B.mp4", "Be.mp4", "Beautiful.mp4", "Before.mp4", "Best.mp4", "Better.mp4", "Busy.mp4", "But.mp4", "Bye.mp4",
    "C.mp4", "Can.mp4", "Cannot.mp4", "Change.mp4", "College.mp4", "Come.mp4", "Computer.mp4", "D.mp4", "Day.mp4", "Distance.mp4",
    "Do Not.mp4", "Do.mp4", "Does Not.mp4", "E.mp4", "Eat.mp4", "Engineer.mp4", "F.mp4", "Fight.mp4", "Finish.mp4", "From.mp4",
    "G.mp4", "Glitter.mp4", "Go.mp4", "God.mp4", "Gold.mp4", "Good.mp4", "Great.mp4", "H.mp4", "Hand.mp4", "Hands.mp4",
    "Happy.mp4", "Hello.mp4", "Help.mp4", "Her.mp4", "Here.mp4", "His.mp4", "Home.mp4", "Homepage.mp4", "How.mp4", "I.mp4",
    "Invent.mp4", "It.mp4", "J.mp4", "K.mp4", "Keep.mp4", "L.mp4", "Language.mp4", "Laugh.mp4", "Learn.mp4", "M.mp4",
    "ME.mp4", "mic3.png", "More.mp4", "My.mp4", "N.mp4", "Name.mp4", "Next.mp4", "Not.mp4", "Now.mp4", "O.mp4",
    "Of.mp4", "On.mp4", "Our.mp4", "Out.mp4", "P.mp4", "Pretty.mp4", "Q.mp4", "R.mp4", "Right.mp4", "S.mp4",
    "Sad.mp4", "Safe.mp4", "See.mp4", "Self.mp4", "Sign.mp4", "Sing.mp4", "So.mp4", "Sound.mp4", "Stay.mp4", "Study.mp4",
    "T.mp4", "Talk.mp4", "Television.mp4", "Thank You.mp4", "Thank.mp4", "That.mp4", "They.mp4", "This.mp4", "Those.mp4", "Time.mp4",
    "To.mp4", "Type.mp4", "U.mp4", "Us.mp4", "V.mp4", "W.mp4", "Walk.mp4", "Wash.mp4", "Way.mp4", "We.mp4",
    "Welcome.mp4", "What.mp4", "When.mp4", "Where.mp4", "Which.mp4", "Who.mp4", "Whole.mp4", "Whose.mp4", "Why.mp4", "Will.mp4",
    "With.mp4", "Without.mp4", "Words.mp4", "Work.mp4", "World.mp4", "Wrong.mp4", "X.mp4", "Y.mp4", "You.mp4", "Your.mp4",
    "Yourself.mp4", "Z.mp4"
];

const stop_words = [
    "mightn't", 're', 'wasn', 'wouldn', 'be', 'has', 'that', 'does', 'shouldn', 'do', "you've", 'off', 'for', 
    "didn't", 'm', 'ain', 'haven', "weren't", 'are', "she's", "wasn't", 'its', "haven't", "wouldn't", 'don', 
    'weren', 's', "you'd", "don't", 'doesn', "hadn't", 'is', 'was', "that'll", "should've", 'a', 'then', 'the', 
    'mustn', 'i', 'nor', 'as', "it's", "needn't", 'd', 'am', 'have', 'hasn', 'o', "aren't", "you'll", "couldn't", 
    "you're", "mustn't", 'didn', "doesn't", 'll', 'an', 'hadn', 'whom', 'y', "hasn't", 'itself', 'couldn', 
    'needn', "shan't", 'isn', 'been', 'such', 'shan', "shouldn't", 'aren', 'being', 'were', 'did', 'ma', 't', 
    'having', 'mightn', 've', "isn't", "won't", 'in', 'on', 'at', 'with', 'of', 'to', 'by'
  ];


function tokenize(sentence) {
    return sentence
        .toLowerCase()
        .match(/\b(\w+)\b/g) || [];
}

function checkAssetExists(word) {
    let check = false;
    fileNames.map((item) => {
        if (item.toLowerCase().split('.')[0] == word.toLowerCase()) {
            check = true;
        }
    })
    return check;
}
console.log(checkAssetExists('sing'));

app.post('/api/animation', (req, res) => {
    try {
        const { sen } = req.body;
        if (!sen) {
            return res.status(400).json({ error: 'Sentence not provided' });
        }

        const words = tokenize(sen);

        const wordsForAnimation = words.flatMap(word => {
            if (stop_words.includes(word.toLowerCase())) {
                return []; // Return an empty array to skip this word
            } else if (checkAssetExists(word)) {
                return [word]; // Return the valid word in an array
            } else {
                // Return each letter as an array if asset not found
                return word.split('');
            }
        });
        

        return res.status(200).json({
            words: wordsForAnimation,
            text: sen
        });
    } catch (error) {
        console.error('Error in animation processing:', error);
        return res.status(500).json({ error: 'Server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
