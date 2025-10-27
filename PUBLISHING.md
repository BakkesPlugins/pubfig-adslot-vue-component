# Publishing to GitHub Packages

This repository is configured to automatically publish to the BakkesPlugins GitHub Packages NPM registry when code is pushed to the `main` branch.

## Automatic Publishing

The GitHub Actions workflow (`.github/workflows/publish.yml`) automatically:

1. Builds the package
2. Runs API validation
3. Reconfigures the package name to `@bakkesplugins/pubfig-adslot-vue-component`
4. Publishes to GitHub Packages NPM registry

## Workflow Triggers

The workflow runs on:
- Push to `main` branch

## Package Configuration

The package is published with:
- **Package Name**: `@bakkesplugins/pubfig-adslot-vue-component`
- **Registry**: `https://npm.pkg.github.com`
- **Version**: Taken from `package.json`

## Installation for Users

Users can install the package from GitHub Packages:

```bash
# Configure npm to use GitHub Packages for @bakkesplugins scope
npm config set @bakkesplugins:registry https://npm.pkg.github.com

# Install the package
npm install --save @bakkesplugins/pubfig-adslot-vue-component
```

### Authentication

Users need a GitHub Personal Access Token with `read:packages` permission. Create a `.npmrc` file:

```
@bakkesplugins:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

## Manual Publishing

If you need to publish manually:

```bash
# Build the package
npm run build

# Validate
npm run validate

# Update package name and registry
node -e "
  const fs = require('fs');
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  pkg.name = '@bakkesplugins/pubfig-adslot-vue-component';
  pkg.publishConfig = { registry: 'https://npm.pkg.github.com' };
  fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
"

# Publish
npm publish --registry=https://npm.pkg.github.com
```

## Version Management

To publish a new version:

1. Update the version in `package.json`:
   ```bash
   npm version patch  # or minor, or major
   ```

2. Push to main:
   ```bash
   git push origin main
   git push origin --tags
   ```

3. The GitHub Action will automatically publish the new version.

## Permissions

The workflow uses `GITHUB_TOKEN` which is automatically provided by GitHub Actions with the following permissions:
- `contents: read` - To checkout the repository
- `packages: write` - To publish to GitHub Packages

No additional secrets are required.
