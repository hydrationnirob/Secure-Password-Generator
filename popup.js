document.addEventListener('DOMContentLoaded', function() {
  const generateButton = document.getElementById('generate');
  const numPasswordsInput = document.getElementById('numPasswords');
  const passwordsContainer = document.getElementById('passwords');

  generateButton.addEventListener('click', function() {
      const numPasswords = parseInt(numPasswordsInput.value);
      passwordsContainer.innerHTML = ''; // Clear previous passwords

      for (let i = 0; i < numPasswords; i++) {
          const password = generatePassword();
          const passwordElement = document.createElement('div');
          passwordElement.classList.add('password');
          passwordElement.textContent = password;

          const copyButton = document.createElement('button');
          copyButton.textContent = 'Copy';
          copyButton.classList.add('copy-button');
          copyButton.addEventListener('click', function() {
              copyToClipboard(password);
          });

          passwordElement.appendChild(copyButton);
          passwordsContainer.appendChild(passwordElement);
      }
  });
});

function generatePassword() {
  let charset = '';
  const includeAbc = document.getElementById('abc').checked;
  const includeNum = document.getElementById('123').checked;
  const includeABC = document.getElementById('ABC').checked;
  const includeSymbols = document.getElementById('symbols').checked;
  const includeSimilarWords = document.getElementById('similarWords').checked;
  const includeUniqueChars = document.getElementById('uniqueChars').checked;
  const includeEqualProb = document.getElementById('equalProb').checked;
  const includeMoreSymbols = document.getElementById('moreSymbols').checked;

  if (includeAbc) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (includeNum) charset += '0123456789';
  if (includeABC) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (includeSymbols) charset += '#$&';
  if (includeSimilarWords) charset += '0Oo|l1';
  if (includeMoreSymbols) charset += '%()+-=[]{}|~.,';

  let length = parseInt(document.getElementById('length').value);
  let password = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
  }

  if (includeUniqueChars) {
      password = [...new Set(password.split(''))].join('');
  }

  if (includeEqualProb) {
      password = password.split('').sort(() => Math.random() - 0.5).join('');
  }

  return password;
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
      .then(() => {
          alert('Password copied to clipboard!');
      })
      .catch((err) => {
          console.error('Failed to copy password: ', err);
      });
}
