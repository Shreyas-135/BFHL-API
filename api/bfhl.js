
// api/bfhl.js
export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ is_success: false, message: "Method Not Allowed" });
  }

  // --- UPDATE THESE with your details ---
  const USER_FULLNAME = "john_doe";       // lowercase with underscores
  const USER_DOB_DDMMYYYY = "17091999";  // ddmmyyyy
  const USER_EMAIL = "john@xyz.com";
  const USER_ROLL = "ABCD123";
  // --------------------------------------

  const buildUserId = () => `${USER_FULLNAME}_${USER_DOB_DDMMYYYY}`;

  const payload = req.body;

  if (!payload || !Array.isArray(payload.data)) {
    return res.status(400).json({
      is_success: false,
      message: "Request body must have a 'data' array"
    });
  }

  const even_numbers = [];
  const odd_numbers = [];
  const alphabets = [];
  const special_characters = [];
  let sum = 0;
  const allAlphaChars = [];

  for (let item of payload.data) {
    const s = String(item);

    for (const ch of s) {
      if (/[A-Za-z]/.test(ch)) allAlphaChars.push(ch);
    }

    if (/^[0-9]+$/.test(s)) {
      const num = parseInt(s, 10);
      sum += num;
      if (num % 2 === 0) even_numbers.push(s);
      else odd_numbers.push(s);
    } else if (/^[A-Za-z]+$/.test(s)) {
      alphabets.push(s.toUpperCase());
    } else if (/^[^A-Za-z0-9]+$/.test(s)) {
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

  return res.status(200).json({
    is_success: true,
    user_id: buildUserId(),
    email: USER_EMAIL,
    roll_number: USER_ROLL,
    odd_numbers,
    even_numbers,
    alphabets,
    special_characters,
    sum: String(sum),
    concat_string
  });
}
