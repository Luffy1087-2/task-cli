import { readdirSync } from 'fs';
import { join } from 'path';
import { run } from 'node:test';
import { pathToFileURL } from 'url';

const loadTests = async (directoryPath: string) => {
  try {
    const files = readdirSync(directoryPath, { withFileTypes: true });
    for (const file of files) {
      if (file.isDirectory()) await loadTests(join(directoryPath, file.name));
      if (file.isFile() && file.name.match(/\.test.js$/)) {
        const filePath = join(directoryPath, file.name);
        const fileUrl = pathToFileURL(filePath).href;
        await import(fileUrl);
      }
    }
  } catch(e: any) {
    console.log(e);
  }
};

(async () => {
  process.env.TASK_TRACKER_CLI_JSON_DIR = 'dist/test/task';
  await loadTests('dist/test');
  run();
})();
