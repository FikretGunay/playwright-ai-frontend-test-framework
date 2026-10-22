# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: registration.spec.ts >> Form-level behavior >> errors are cleared and success shown after correcting the input
- Location: tests\e2e\registration.spec.ts:145:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('error-age')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByTestId('error-age') with timeout 5000ms
  - waiting for getByTestId('error-age')

```

```yaml
- heading "Register" [level=1]
- text: Name
- textbox "Name": Anna Svensson
- text: Email
- textbox "Email": anna@example.com
- text: Password
- textbox "Password": password123
- text: Age
- spinbutton "Age": "17"
- button "Submit"
- status: Registration successful
```

# Test source

```ts
  47  |     await expect(page.getByTestId('error-name')).toHaveText('Name is required.');
  48  |     await expect(page.getByTestId('success-message')).toBeHidden();
  49  |   });
  50  | });
  51  | 
  52  | test.describe('Email', () => {
  53  |   test('empty email shows required error', async ({ page }) => {
  54  |     await submitForm(page, { email: '' });
  55  |     await expect(page.getByTestId('error-email')).toHaveText('Email is required.');
  56  |   });
  57  | 
  58  |   test('email without @ shows format error', async ({ page }) => {
  59  |     await submitForm(page, { email: 'annaexample.com' });
  60  |     await expect(page.getByTestId('error-email')).toHaveText('Email format is invalid.');
  61  |   });
  62  | 
  63  |   test('email without domain suffix shows format error', async ({ page }) => {
  64  |     await submitForm(page, { email: 'anna@example' });
  65  |     await expect(page.getByTestId('error-email')).toHaveText('Email format is invalid.');
  66  |   });
  67  | 
  68  |   test('email without local part shows format error', async ({ page }) => {
  69  |     await submitForm(page, { email: '@example.com' });
  70  |     await expect(page.getByTestId('error-email')).toHaveText('Email format is invalid.');
  71  |   });
  72  | });
  73  | 
  74  | test.describe('Password', () => {
  75  |   test('empty password shows required error', async ({ page }) => {
  76  |     await submitForm(page, { password: '' });
  77  |     await expect(page.getByTestId('error-password')).toHaveText('Password is required.');
  78  |   });
  79  | 
  80  |   test('7-character password is rejected (boundary: min - 1)', async ({ page }) => {
  81  |     await submitForm(page, { password: '1234567' });
  82  |     await expect(page.getByTestId('error-password')).toHaveText(
  83  |       'Password must be at least 8 characters.'
  84  |     );
  85  |   });
  86  | 
  87  |   test('8-character password is accepted (boundary: min)', async ({ page }) => {
  88  |     await submitForm(page, { password: '12345678' });
  89  |     await expect(page.getByTestId('success-message')).toBeVisible();
  90  |     await expect(page.getByTestId('error-password')).toHaveCount(0);
  91  |   });
  92  | });
  93  | 
  94  | test.describe('Age', () => {
  95  |   test('empty age shows required error', async ({ page }) => {
  96  |     await submitForm(page, { age: '' });
  97  |     await expect(page.getByTestId('error-age')).toHaveText('Age is required.');
  98  |   });
  99  | 
  100 |   test('age 17 is rejected (boundary: min - 1)', async ({ page }) => {
  101 |     await submitForm(page, { age: '17' });
  102 |     await expect(page.getByTestId('error-age')).toHaveText('Age must be between 18 and 65.');
  103 |   });
  104 | 
  105 |   test('age 18 is accepted (boundary: min)', async ({ page }) => {
  106 |     await submitForm(page, { age: '18' });
  107 |     await expect(page.getByTestId('success-message')).toBeVisible();
  108 |     await expect(page.getByTestId('error-age')).toHaveCount(0);
  109 |   });
  110 | 
  111 |   test('age 65 is accepted (boundary: max)', async ({ page }) => {
  112 |     await submitForm(page, { age: '65' });
  113 |     await expect(page.getByTestId('success-message')).toBeVisible();
  114 |     await expect(page.getByTestId('error-age')).toHaveCount(0);
  115 |   });
  116 | 
  117 |   test('age 66 is rejected (boundary: max + 1)', async ({ page }) => {
  118 |     await submitForm(page, { age: '66' });
  119 |     await expect(page.getByTestId('error-age')).toHaveText('Age must be between 18 and 65.');
  120 |   });
  121 | 
  122 |   test('age 15 is rejected (below minimum)', async ({ page }) => {
  123 |     await submitForm(page, { age: '15' });
  124 |     await expect(page.getByTestId('error-age')).toHaveText('Age must be between 18 and 65.');
  125 |   });
  126 | 
  127 |   test('negative age is rejected', async ({ page }) => {
  128 |     await submitForm(page, { age: '-5' });
  129 |     await expect(page.getByTestId('error-age')).toHaveText('Age must be between 18 and 65.');
  130 |   });
  131 | 
  132 |   test('age 0 is rejected', async ({ page }) => {
  133 |     await submitForm(page, { age: '0' });
  134 |     await expect(page.getByTestId('error-age')).toHaveText('Age must be between 18 and 65.');
  135 |   });
  136 | });
  137 | 
  138 | test.describe('Form-level behavior', () => {
  139 |   test('all fields empty shows four required errors', async ({ page }) => {
  140 |     await page.getByTestId('submit-button').click();
  141 |     await expect(page.getByTestId('error-list').locator('li')).toHaveCount(4);
  142 |     await expect(page.getByTestId('success-message')).toBeHidden();
  143 |   });
  144 | 
  145 |   test('errors are cleared and success shown after correcting the input', async ({ page }) => {
  146 |     await submitForm(page, { age: '17' });
> 147 |     await expect(page.getByTestId('error-age')).toBeVisible();
      |                                                 ^ Error: expect(locator).toBeVisible() failed
  148 |     await page.getByTestId('age-input').fill('30');
  149 |     await page.getByTestId('submit-button').click();
  150 |     await expect(page.getByTestId('error-list')).toBeHidden();
  151 |     await expect(page.getByTestId('success-message')).toBeVisible();
  152 |   });
  153 | 
  154 |   test('success message is hidden after a subsequent invalid submission', async ({ page }) => {
  155 |     await submitForm(page);
  156 |     await expect(page.getByTestId('success-message')).toBeVisible();
  157 |     await page.getByTestId('name-input').fill('');
  158 |     await page.getByTestId('submit-button').click();
  159 |     await expect(page.getByTestId('success-message')).toBeHidden();
  160 |     await expect(page.getByTestId('error-name')).toBeVisible();
  161 |   });
  162 | });
  163 | 
```