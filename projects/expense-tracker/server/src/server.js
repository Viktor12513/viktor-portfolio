import app from './app.js';

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Expense Tracker API running at http://localhost:${PORT}`);
});
