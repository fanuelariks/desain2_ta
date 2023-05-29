const fs = require("fs").promises;
const firebase = require("firebase");

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

const upload = async () => {
  const questionJSON = await fs.readFile("question.json");
  const question = JSON.parse(questionJSON);
  console.log(question);

  const database = firebase.database();
  const ref = database.ref("quiz/questions");
  question.forEach((q) => {
    ref.push(q);
  });
  console.log("Complete");
};
upload();
