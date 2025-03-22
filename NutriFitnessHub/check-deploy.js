#!/usr/bin/env node

/**
 * Simple pre-deployment check script
 */

// Required environment variables for production
const requiredEnvVars = [
  'DATABASE_URL',
  'SESSION_SECRET',
  'NODE_ENV',
  'PORT'
];

console.log('\n🚀 Nutrifitness Pre-Deployment Check\n');
console.log('Checking required environment variables:');

let hasErrors = false;

// Check required environment variables
for (const envVar of requiredEnvVars) {
  if (process.env[envVar]) {
    console.log(`✅ ${envVar} is set`);
  } else {
    console.error(`❌ Missing required environment variable: ${envVar}`);
    hasErrors = true;
  }
}

// Check health endpoint
console.log('\nChecking health endpoint:');
const fs = require('fs');
try {
  const routesContent = fs.readFileSync('./server/routes.ts', 'utf8');
  if (routesContent.includes('/health') && routesContent.includes('res.status(200)')) {
    console.log('✅ Health endpoint detected');
  } else {
    console.warn('⚠️ Health endpoint not detected or might be implemented differently');
  }
} catch (error) {
  console.error(`❌ Error checking for health endpoint: ${error.message}`);
}

// Final summary
console.log('\n📋 Pre-deployment check summary:');
if (hasErrors) {
  console.error('❌ There are critical issues that need to be fixed before deployment.\n');
  process.exit(1);
} else {
  console.log('✅ All critical checks passed. Ready for deployment!\n');
}