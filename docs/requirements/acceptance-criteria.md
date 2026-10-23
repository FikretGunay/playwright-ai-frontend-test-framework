# Acceptance Criteria: Registration Form

Date: 2026-10-22. Format: Given / When / Then.

## US-001: Successful registration

| ID | Criterion |
|---|---|
| AC-001 | **Given** all four fields contain valid values, **when** the user presses Submit, **then** `Registration successful` is displayed. |
| AC-002 | **Given** all four fields contain valid values, **when** the user presses Submit, **then** the error list is not visible. |

## US-002: Name and email validation

| ID | Criterion |
|---|---|
| AC-003 | **Given** Name is empty, **when** the user presses Submit, **then** `Name is required.` is displayed and no success message is shown. |
| AC-004 | **Given** Name contains only spaces, **when** the user presses Submit, **then** `Name is required.` is displayed. |
| AC-005 | **Given** Email is empty, **when** the user presses Submit, **then** `Email is required.` is displayed. |
| AC-006 | **Given** Email has an invalid format (no `@`, no domain suffix or no local part), **when** the user presses Submit, **then** `Email format is invalid.` is displayed. |

## US-003: Password validation

| ID | Criterion |
|---|---|
| AC-007 | **Given** Password is empty, **when** the user presses Submit, **then** `Password is required.` is displayed. |
| AC-008 | **Given** Password has 1 to 7 characters, **when** the user presses Submit, **then** `Password must be at least 8 characters.` is displayed. |
| AC-009 | **Given** Password has exactly 8 characters and other fields are valid, **when** the user presses Submit, **then** no password error is shown and the registration succeeds. |

## US-004: Age validation

| ID | Criterion |
|---|---|
| AC-010 | **Given** Age is empty, **when** the user presses Submit, **then** `Age is required.` is displayed. |
| AC-011 | **Given** Age is below 18 (for example 17 or 15), **when** the user presses Submit, **then** `Age must be between 18 and 65.` is displayed. |
| AC-012 | **Given** Age is exactly 18 or exactly 65 and other fields are valid, **when** the user presses Submit, **then** no age error is shown and the registration succeeds. |
| AC-013 | **Given** Age is above 65 (for example 66), **when** the user presses Submit, **then** `Age must be between 18 and 65.` is displayed. |
| AC-014 | **Given** Age is zero or negative, **when** the user presses Submit, **then** `Age must be between 18 and 65.` is displayed. |

## US-005: Feedback behavior

| ID | Criterion |
|---|---|
| AC-015 | **Given** all fields are empty, **when** the user presses Submit, **then** four errors are listed, one per field, in the order Name, Email, Password, Age. |
| AC-016 | **Given** an error is displayed, **when** the user corrects the value and presses Submit again, **then** the error is removed and the success message is displayed. |
| AC-017 | **Given** the success message is displayed, **when** the user makes a field invalid and presses Submit, **then** the success message is hidden and the error is displayed. |
