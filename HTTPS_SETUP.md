# HTTPS Setup Guide

This guide explains how to run your Next.js application with HTTPS using SSL certificates.

## Prerequisites

- SSL certificate files (`.pem` or `.crt` and `.key` files)
- Node.js installed

## Setup Instructions

### 1. Place Your Certificate Files

Place your SSL certificate files in the `certs/` directory:

```
certs/
├── cert.pem    # Your SSL certificate
└── key.pem     # Your private key
```

### 2. Certificate File Formats

If your certificates are in different formats, you may need to convert them:

#### Converting .crt/.key to .pem:
```bash
# Convert certificate
openssl x509 -in your-cert.crt -out certs/cert.pem -outform PEM

# Convert private key (if needed)
openssl rsa -in your-key.key -out certs/key.pem -outform PEM
```

#### Converting .pfx to .pem:
```bash
# Extract certificate and key from PFX
openssl pkcs12 -in your-cert.pfx -out certs/cert.pem -clcerts -nokeys
openssl pkcs12 -in your-cert.pfx -out certs/key.pem -nocerts -nodes
```

### 3. Update Server Configuration

If your certificate files have different names, update the `server.js` file:

```javascript
const httpsOptions = {
  cert: fs.readFileSync(path.join(__dirname, 'certs', 'your-cert.pem')),
  key: fs.readFileSync(path.join(__dirname, 'certs', 'your-key.pem')),
};
```

### 4. Run the Application

#### Development with HTTPS:
```bash
npm run dev:https
# or
yarn dev:https
```

#### Production with HTTPS:
```bash
npm run build
npm run start:https
# or
yarn build
yarn start:https
```

### 5. Access Your Application

Your application will be available at:
- **Development**: https://localhost:3000
- **Production**: https://your-domain:3000 (or your configured port)

## Troubleshooting

### Certificate Errors

1. **"ENOENT: no such file or directory"**: Check that your certificate files are in the `certs/` directory
2. **"ERR_TLS_CERT_ALTNAME_INVALID"**: Your certificate doesn't match the hostname
3. **"ERR_CERT_AUTHORITY_INVALID"**: Self-signed certificate - you may need to add it to your trusted certificates

### Self-Signed Certificates

For development with self-signed certificates:

1. Generate a self-signed certificate:
```bash
openssl req -x509 -newkey rsa:4096 -keyout certs/key.pem -out certs/cert.pem -days 365 -nodes
```

2. Add the certificate to your system's trusted certificates (varies by OS)

### Port Configuration

To change the default port, set the `PORT` environment variable:

```bash
PORT=8443 npm run dev:https
```

## Security Notes

- Never commit your certificate files to version control
- The `certs/` directory is already added to `.gitignore`
- Use strong, unique private keys
- Regularly update your certificates before they expire 