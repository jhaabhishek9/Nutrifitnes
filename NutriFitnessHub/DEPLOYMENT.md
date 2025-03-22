# Nutrifitness Deployment Guide

This document provides step-by-step instructions for deploying the Nutrifitness website to production using Replit Deployments and connecting it to your custom domain.

## Prerequisites

1. BigRock domain account credentials:
   - Username: eshitapareek97@gmail.com
   - Password: Eshita@123
   - Domain: nutrifitness.in.net

2. DNS Nameservers:
   - dns1.bigrock.in
   - dns2.bigrock.in
   - dns3.bigrock.in
   - dns4.bigrock.in

## Deployment Steps

### 1. Deploy your application on Replit

1. Click on the "Deploy" button in your Replit workspace
2. Configure deployment settings:
   - Name: Nutrifitness
   - Production Branch: main
   - Health Check Path: /health
   - Build Command: npm run build
   - Start Command: npm run start

3. Click "Deploy" and wait for the deployment to complete

### 2. Set up Custom Domain

1. After deployment completes, go to the "Domains" tab in the deployment settings
2. Click "Add Domain"
3. Enter your domain: nutrifitness.in.net
4. Click "Add" and wait for verification

### 3. Configure DNS at BigRock

1. Login to your BigRock account at https://www.bigrock.in/
   - Username: eshitapareek97@gmail.com
   - Password: Eshita@123

2. Navigate to your domain management panel
3. Select nutrifitness.in.net
4. Go to "DNS Settings" or "Nameservers"
5. You have two options:

   **Option A: Use Replit's nameservers**
   - Replace BigRock nameservers with the nameservers provided by Replit in the deployment domain settings
   
   **Option B: Keep BigRock nameservers and add DNS records**
   - Add an A record:
     - Name: @ (or leave blank)
     - Value: [IP address from Replit deployment]
     - TTL: 3600 (or default)
   
   - Add a CNAME record:
     - Name: www
     - Value: [your-repl-username].[deployment-id].repl.co (from Replit deployment)
     - TTL: 3600 (or default)

6. Save your changes

### 4. Wait for DNS Propagation

DNS changes can take anywhere from a few minutes to 48 hours to propagate globally. During this time, your website may be accessible in some regions but not others.

### 5. Verify Deployment

1. Visit https://nutrifitness.in.net in your browser
2. Confirm that your site loads properly
3. Test key functionality:
   - User registration/login
   - BMI calculator
   - Consultation booking
   - Payment processing

### 6. Set Up Environment Variables

Make sure the following environment variables are set in your Replit deployment:

- DATABASE_URL: The PostgreSQL database connection string
- SESSION_SECRET: A secure random string for session encryption
- NODE_ENV: Set to "production"
- PORT: Set to 8080 (or your preferred port)

### Troubleshooting

If you encounter issues with deployment:

1. Check the deployment logs for errors
2. Verify that the health check endpoint (/health) returns a 200 status code
3. Confirm that DNS settings are correctly configured
4. Ensure all environment variables are properly set

For DNS issues:
- Use https://dnschecker.org to verify your domain is pointing to the correct IP address
- Contact BigRock support if you need assistance with DNS configuration

### Contact Information

For questions or issues, contact:
- Email: jhaabhishek1998@gmail.com (for technical support)
- Email: eshitapareek97@gmail.com (for domain access)