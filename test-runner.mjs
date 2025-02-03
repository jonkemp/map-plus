import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createServer } from 'http-server';
import chalk from 'chalk';

const __dirname = dirname(fileURLToPath(import.meta.url));

(async () => {
  const server = createServer({ root: __dirname });
  server.listen(8080);

  const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();

  // Handle console messages from the page
  page.on('console', message => {
    try {
      const data = JSON.parse(message.text());
      switch (data.type) {
        case 'test':
          console.log(chalk.gray(`  ${data.msg}`));
          break;
        case 'pass':
          console.log(chalk.green(`  ${data.msg}`));
          break;
        case 'fail':
          console.log(chalk.red(`  ${data.msg}`));
          break;
        case 'end':
          const stats = JSON.parse(data.msg);
          console.log('\nTest Summary:');
          console.log(chalk.green(`  ✓ Passed: ${stats.passes}`));
          console.log(chalk.red(`  ✗ Failed: ${stats.failures}`));
          console.log(chalk.blue(`  Total: ${stats.tests}`));
          console.log(chalk.gray(`  Duration: ${stats.duration}ms\n`));
          break;
      }
    } catch (e) {
      // If not JSON, just log the console message as-is
      console.log(message.text());
    }
  });

  try {
    await page.goto('http://localhost:8080/test.html');

    // Wait for Mocha to finish running tests
    const failures = await page.evaluate(() => {
      return new Promise(resolve => {
        mocha.run(function(failures) {
          resolve(failures);
        });
      });
    });

    process.exit(failures ? 1 : 0);
  } catch (error) {
    console.error(chalk.red('Test runner error:', error));
    process.exit(1);
  } finally {
    await browser.close();
    server.close();
  }
})();
