
const express = require("express");
const app = express();

app.use(express.json());

const USER_FULLNAME = "john_doe";        
const USER_DOB_DDMMYYYY = "17091999";   
const USER_EMAIL = "john@xyz.com";
const USER_ROLL = "ABCD123";

const buildUserId = () => `${USER_FULLNAME}_${USER_DOB_DDMMYYYY}`;

function isAllDigits(s) {
  return /^[0-9]+$/.test(s);
}
function isAllLetters(s) {
  return /^[A-Za-z]+$/.test(s);
}
function isAllSpecials(s) {
  return /^[^A-Za-z0-9]+$/.test(s);
}

app.post("/bfhl", (req, res) => {
  try {
    const payload = req.body;
    if (!payload || !Array.isArray(payload.data)) {
      return res.status(400).json({
        is_success: false,
        message: "Request body should be JSON with a 'data' array."
      });
    }

    const input = payload.data;

    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];

    let sum = 0;

    const allAlphaChars = [];

    for (let item of input) {
      const s = String(item);

      for (const ch of s) {
        if (/[A-Za-z]/.test(ch)) allAlphaChars.push(ch);
      }

      if (isAllDigits(s)) {
        const num = parseInt(s, 10);
        sum += num;
        if (num % 2 === 0) even_numbers.push(s);
        else odd_numbers.push(s);
      } else if (isAllLetters(s)) {
        alphabets.push(s.toUpperCase());
      } else if (isAllSpecials(s)) {
        special_characters.push(s);
      } else {
        const digitMatches = s.match(/\d+/g);
        if (digitMatches) {
          for (const dm of digitMatches) {
            const num = parseInt(dm, 10);
            sum += num;
            if (num % 2 === 0) even_numbers.push(String(dm));
            else odd_numbers.push(String(dm));
          }
        }
        const specialMatches = s.match(/[^A-Za-z0-9]+/g);
        if (specialMatches) {
          for (const sp of specialMatches) special_characters.push(sp);
        }
      }
    }

    const reversedAlpha = allAlphaChars.reverse();
    const concat_chars = reversedAlpha.map((ch, idx) =>
      idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
    );
    const concat_string = concat_chars.join("");

    const response = {
      is_success: true,
      user_id: buildUserId(),
      email: USER_EMAIL,
      roll_number: USER_ROLL,
      odd_numbers: odd_numbers.map(String),
      even_numbers: even_numbers.map(String),
      alphabets,
      special_characters,
      sum: String(sum),
      concat_string
    };

    return res.status(200).json(response);
  } catch (err) {
    console.error("Error in /bfhl:", err);
    return res.status(500).json({
      is_success: false,
      message: "Internal server error"
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
