import { test, expect, Page } from '@playwright/test';
import { pathToFileURL } from 'url';
import path from 'path';

const PAGE_URL = pathToFileURL(path.resolve(__dirname, '../../index.html')).href;

const VALID = {
  name: 'Anna Svensson',
  email: 'anna@example.com',
  password: 'password123',
  age: '30',
};

type FormData = typeof VALID;

async function submitForm(page: Page, overrides: Partial<FormData> = {}) {
  const data = { ...VALID, ...overrides };
  await page.getByTestId('name-input').fill(data.name);
  await page.getByTestId('email-input').fill(data.email);
  await page.getByTestId('password-input').fill(data.password);
  await page.getByTestId('age-input').fill(data.age);
  await page.getByTestId('submit-button').click();
}

test.beforeEach(async ({ page }) => {
  await page.goto(PAGE_URL);
});

test.describe('Valid submission', () => {
  test('shows success message and no errors for valid data', async ({ page }) => {
    await submitForm(page);
    await expect(page.getByTestId('success-message')).toBeVisible();
    await expect(page.getByTestId('success-message')).toHaveText('Registration successful');
    await expect(page.getByTestId('error-list')).toBeHidden();
  });
});

test.describe('Name', () => {
  test('empty name shows required error', async ({ page }) => {
    await submitForm(page, { name: '' });
    await expect(page.getByTestId('error-name')).toHaveText('Name is required.');
    await expect(page.getByTestId('success-message')).toBeHidden();
  });

  test('whitespace-only name shows required error', async ({ page }) => {
    await submitForm(page, { name: '   ' });
    await expect(page.getByTestId('error-name')).toHaveText('Name is required.');
    await expect(page.getByTestId('success-message')).toBeHidden();
  });
});

test.describe('Email', () => {
  test('empty email shows required error', async ({ page }) => {
    await submitForm(page, { email: '' });
    await expect(page.getByTestId('error-email')).toHaveText('Email is required.');
  });

  test('email without @ shows format error', async ({ page }) => {
    await submitForm(page, { email: 'annaexample.com' });
    await expect(page.getByTestId('error-email')).toHaveText('Email format is invalid.');
  });

  test('email without domain suffix shows format error', async ({ page }) => {
    await submitForm(page, { email: 'anna@example' });
    await expect(page.getByTestId('error-email')).toHaveText('Email format is invalid.');
  });

  test('email without local part shows format error', async ({ page }) => {
    await submitForm(page, { email: '@example.com' });
    await expect(page.getByTestId('error-email')).toHaveText('Email format is invalid.');
  });
});

test.describe('Password', () => {
  test('empty password shows required error', async ({ page }) => {
    await submitForm(page, { password: '' });
    await expect(page.getByTestId('error-password')).toHaveText('Password is required.');
  });

  test('7-character password is rejected (boundary: min - 1)', async ({ page }) => {
    await submitForm(page, { password: '1234567' });
    await expect(page.getByTestId('error-password')).toHaveText(
      'Password must be at least 8 characters.'
    );
  });

  test('8-character password is accepted (boundary: min)', async ({ page }) => {
    await submitForm(page, { password: '12345678' });
    await expect(page.getByTestId('success-message')).toBeVisible();
    await expect(page.getByTestId('error-password')).toHaveCount(0);
  });
});

test.describe('Age', () => {
  test('empty age shows required error', async ({ page }) => {
    await submitForm(page, { age: '' });
    await expect(page.getByTestId('error-age')).toHaveText('Age is required.');
  });

  test('age 17 is rejected (boundary: min - 1)', async ({ page }) => {
    await submitForm(page, { age: '17' });
    await expect(page.getByTestId('error-age')).toHaveText('Age must be between 18 and 65.');
  });

  test('age 18 is accepted (boundary: min)', async ({ page }) => {
    await submitForm(page, { age: '18' });
    await expect(page.getByTestId('success-message')).toBeVisible();
    await expect(page.getByTestId('error-age')).toHaveCount(0);
  });

  test('age 65 is accepted (boundary: max)', async ({ page }) => {
    await submitForm(page, { age: '65' });
    await expect(page.getByTestId('success-message')).toBeVisible();
    await expect(page.getByTestId('error-age')).toHaveCount(0);
  });

  test('age 66 is rejected (boundary: max + 1)', async ({ page }) => {
    await submitForm(page, { age: '66' });
    await expect(page.getByTestId('error-age')).toHaveText('Age must be between 18 and 65.');
  });

  test('age 15 is rejected (below minimum)', async ({ page }) => {
    await submitForm(page, { age: '15' });
    await expect(page.getByTestId('error-age')).toHaveText('Age must be between 18 and 65.');
  });

  test('negative age is rejected', async ({ page }) => {
    await submitForm(page, { age: '-5' });
    await expect(page.getByTestId('error-age')).toHaveText('Age must be between 18 and 65.');
  });

  test('age 0 is rejected', async ({ page }) => {
    await submitForm(page, { age: '0' });
    await expect(page.getByTestId('error-age')).toHaveText('Age must be between 18 and 65.');
  });
});

test.describe('Form-level behavior', () => {
  test('all fields empty shows four required errors', async ({ page }) => {
    await page.getByTestId('submit-button').click();
    await expect(page.getByTestId('error-list').locator('li')).toHaveCount(4);
    await expect(page.getByTestId('error-list').locator('li')).toHaveText([
      'Name is required.',
      'Email is required.',
      'Password is required.',
      'Age is required.',
    ]);
    await expect(page.getByTestId('success-message')).toBeHidden();
  });

  test('errors are cleared and success shown after correcting the input', async ({ page }) => {
    await submitForm(page, { age: '17' });
    await expect(page.getByTestId('error-age')).toBeVisible();
    await page.getByTestId('age-input').fill('30');
    await page.getByTestId('submit-button').click();
    await expect(page.getByTestId('error-list')).toBeHidden();
    await expect(page.getByTestId('success-message')).toBeVisible();
  });

  test('success message is hidden after a subsequent invalid submission', async ({ page }) => {
    await submitForm(page);
    await expect(page.getByTestId('success-message')).toBeVisible();
    await page.getByTestId('name-input').fill('');
    await page.getByTestId('submit-button').click();
    await expect(page.getByTestId('success-message')).toBeHidden();
    await expect(page.getByTestId('error-name')).toBeVisible();
  });
});
