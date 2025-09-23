const express = require("express");
const { google } = require("googleapis");
const dotenv = require("dotenv");
const fs = require("fs");
const cors = require("cors");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
const CREDENTIALS_PATH = process.env.GOOGLE_CREDENTIALS_PATH;
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

async function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const authClient = await auth.getClient();
  return google.sheets({ version: "v4", auth: authClient });
}

app.get("/students", async (req, res) => {
  try {
    const sheets = await getSheetsClient();
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "名單!A2:C83",
    });

    const rows = result.data.values || [];

    const students = rows
      .filter(row => row[0] && row[1] && row[2])
      .map((row, idx) => ({
        dept: row[0],
        id: row[1],
        name: row[2],
        index: idx + 1,
      }));

    res.json({ students });
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ error: "Failed to fetch students." });
  }
});

app.post("/draw", async (req, res) => {
  try {
    const sheets = await getSheetsClient();
    const today = new Date().toISOString().split("T")[0];

    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "名單!A2:C83",
    });

    const rows = result.data.values || [];
    const students = rows.filter(row => row[0] && row[1] && row[2]);

    if (students.length === 0) {
      return res.status(400).json({ error: "No students found." });
    }

    const pickedIndex = Math.floor(Math.random() * students.length);
    const picked = students[pickedIndex];
    const sheetTitle = today;

    const spreadsheetMeta = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });

    const sheetExists = spreadsheetMeta.data.sheets.some(
      (sheet) => sheet.properties.title === sheetTitle
    );

    if (!sheetExists) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: { title: sheetTitle },
              },
            },
          ],
        },
      });

      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetTitle}!A1`,
        valueInputOption: "RAW",
        requestBody: {
          values: [["學號", "姓名"]],
        },
      });
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetTitle}!A:B`,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [[picked[1], picked[2]]],
      },
    });

    res.json({
      picked: {
        index: pickedIndex + 1,
        dept: picked[0], // department
        id: picked[1],   // student ID
        name: picked[2], // student name
      },
    });
  } catch (err) {
    console.error("Error during draw:", err.errors || err);
    res.status(500).json({ error: "Failed to draw student." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
