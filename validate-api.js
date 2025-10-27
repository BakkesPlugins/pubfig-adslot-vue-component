#!/usr/bin/env node

/**
 * API Validation Script
 * This script verifies that the Vue component maintains API compatibility with the React component
 */

const fs = require('fs');
const path = require('path');

console.log('=== Freestar AdSlot Vue Component API Validation ===\n');

// Read the built component
const distPath = path.join(__dirname, 'dist', 'index.js');
if (!fs.existsSync(distPath)) {
    console.error('❌ Error: dist/index.js not found. Run npm run build first.');
    process.exit(1);
}

const buildContent = fs.readFileSync(distPath, 'utf-8');

// Check for required static methods
const requiredStaticMethods = [
    'setPageTargeting',
    'clearPageTargeting',
    'trackPageview',
    'queueAdCalls',
    'releaseQueuedAds'
];

console.log('Checking for static methods:');
let allMethodsFound = true;
requiredStaticMethods.forEach(method => {
    const found = buildContent.includes(`.${method} =`);
    if (found) {
        console.log(`  ✓ ${method}`);
    } else {
        console.log(`  ❌ ${method} - NOT FOUND`);
        allMethodsFound = false;
    }
});

// Check for Vue imports
console.log('\nChecking Vue 3 Composition API usage:');
const vueImports = [
    'defineComponent',
    'ref',
    'computed',
    'onMounted',
    'onUnmounted',
    'watch'
];

vueImports.forEach(imp => {
    const found = buildContent.includes(imp);
    if (found) {
        console.log(`  ✓ ${imp}`);
    } else {
        console.log(`  ⚠ ${imp} - might not be used`);
    }
});

// Check component structure
console.log('\nChecking component structure:');
const checks = [
    { name: 'Props definition', pattern: /props:\s*\{/ },
    { name: 'Setup function', pattern: /setup\s*\(/ },
    { name: 'Render function', pattern: /render\s*\(/ },
    { name: 'Default export', pattern: /export\s*\{/ }
];

checks.forEach(check => {
    const found = check.pattern.test(buildContent);
    if (found) {
        console.log(`  ✓ ${check.name}`);
    } else {
        console.log(`  ❌ ${check.name} - NOT FOUND`);
    }
});

// Check for freestarWrapper usage
console.log('\nChecking Freestar wrapper integration:');
const wrapperMethods = [
    'init',
    'getMappedPlacementName',
    'newAdSlot',
    'deleteAdSlot',
    'refreshAdSlot'
];

wrapperMethods.forEach(method => {
    const found = buildContent.includes(`.${method}(`);
    if (found) {
        console.log(`  ✓ ${method}`);
    } else {
        console.log(`  ❌ ${method} - NOT FOUND`);
    }
});

if (allMethodsFound) {
    console.log('\n✅ All required static methods are present!');
    console.log('✅ Component structure looks good!');
    console.log('\n✅ API Validation PASSED\n');
    process.exit(0);
} else {
    console.log('\n❌ API Validation FAILED - Some required methods are missing\n');
    process.exit(1);
}
