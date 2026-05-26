/**
 * Renders generative content queries directly to Google Gemini 2.5 Flash models
 *
 * @param {string} promptText - The prompt message to send to the model.
 * @param {string} apiKey - The client-supplied Google Gemini API Key.
 * @returns {Promise<string>} Generative text response from the API.
 */
export async function askGemini(promptText, apiKey) {
  if (!apiKey || !apiKey.trim()) {
    throw new Error("No Gemini API key supplied in Settings.");
  }

  // Pure frontend endpoint for live Gemini 2.5 Flash generateContent API calls
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: promptText + "\nKeep your response structured, professional, under 120 words, and formatted in markdown."
            }
          ]
        }
      ]
    })
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error?.message || `HTTP Server error ${response.status}`);
  }

  const data = await response.json();
  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!reply) {
    throw new Error("Empty candidates returned from Gemini model.");
  }

  return reply;
}
