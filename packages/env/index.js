const fs = require('fs');
const path = require('path');

if (fs.existsSync(path.join(process.cwd(), '.env.example'))) {
  require('dotenv-safe').config();
} else if (fs.existsSync(path.join(process.cwd(), '.env'))) {
  require('dotenv').config();
}
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
