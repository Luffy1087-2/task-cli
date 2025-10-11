import { exec } from 'child_process';

const params = process.argv.slice(2).join(" ");
exec(`npm run task-tracker-cli ${params}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Errore: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
  }
  console.log(`Output: ${stdout}`);
});