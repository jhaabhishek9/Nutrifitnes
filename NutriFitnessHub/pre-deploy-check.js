#!/usr/bin/env node

/**
 * Pre-deployment check script
 * Run this before deploying to production to verify all required settings.
 */

// Required environment variables for production
const requiredEnvVars = [
  'DATABASE_URL',
  'SESSION_SECRET',
  'NODE_ENV', // Should be 'production'
  'PORT'
];

// Optional but recommended environment variables
const recommendedEnvVars = [
  'CALENDLY_URL'
];

console.log('\n🚀 Nutrifitness Pre-Deployment Check\n');
console.log('Checking required environment variables:');

let hasErrors = false;

// Check required environment variables
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`❌ Missing required environment variable: ${envVar}`);
    hasErrors = true;
  } else {
    if (envVar === 'NODE_ENV' && process.env[envVar] !== 'production') {
      console.warn(`⚠️ NODE_ENV is set to '${process.env[envVar]}', but should be 'production' for deployment`);
    } else {
      console.log(`✅ ${envVar} is set`);
    }
  }
}

// Check recommended environment variables
console.log('\nChecking recommended environment variables:');
for (const envVar of recommendedEnvVars) {
  if (!process.env[envVar]) {
    console.warn(`⚠️ Missing recommended environment variable: ${envVar}`);
  } else {
    console.log(`✅ ${envVar} is set`);
  }
}

// Check package.json for build and start scripts
try {
  const packageJson = require('./package.json');
  
  console.log('\nChecking package.json scripts:');
  if (!packageJson.scripts.build) {
    console.error('❌ Missing "build" script in package.json');
    hasErrors = true;
  } else {
    console.log('✅ "build" script exists');
  }
  
  if (!packageJson.scripts.start) {
    console.error('❌ Missing "start" script in package.json');
    hasErrors = true;
  } else {
    console.log('✅ "start" script exists');
  }
} catch (error) {
  console.error('❌ Error reading package.json:', error.message);
  hasErrors = true;
}

// Check for health endpoint
console.log('\nChecking health endpoint:');
try {
  const fs = require('fs');
  const routesContent = fs.readFileSync('./server/routes.ts', 'utf8');
  
  if (routesContent.includes('/health') && routesContent.includes('res.status(200)')) {
    console.log('✅ Health endpoint detected');
  } else {
    console.warn('⚠️ Health endpoint not detected or might be implemented differently');
  }
} catch (error) {
  console.error('❌ Error checking for health endpoint:', error.message);
}

// Final summary
console.log('\n📋 Pre-deployment check summary:');
if (hasErrors) {
  console.error('❌ There are critical issues that need to be fixed before deployment.\n');
  process.exit(1);
} else {
  console.log('✅ All critical checks passed. Ready for deployment!\n');
  
  console.log('Next steps:');
  console.log('1. Run build command: npm run build');
  console.log('2. Deploy the application using the Replit dashboard');
  console.log('3. Configure custom domain using instructions in DEPLOYMENT.md\n');
}