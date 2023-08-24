const fetch = require('node-fetch');
const fs = require('fs');

async function updateContributions() {
  const token = process.env.PRIVATE_ACCESS_TOKEN;
  const username = 'your-username'; // Replace with your GitHub username

  const response = await fetch(`https://api.github.com/users/${username}/contributions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const contributions = await response.text();

  const readmePath = 'README.md';
  const readmeContent = fs.readFileSync(readmePath, 'utf8');
  const updatedReadme = readmeContent.replace(
    /<!--PRIVATE_CONTRIBUTIONS_START-->[\s\S]*<!--PRIVATE_CONTRIBUTIONS_END-->/,
    `<!--PRIVATE_CONTRIBUTIONS_START-->\n${contributions}\n<!--PRIVATE_CONTRIBUTIONS_END-->`
  );

  fs.writeFileSync(readmePath, updatedReadme, 'utf8');
}

updateContributions();
