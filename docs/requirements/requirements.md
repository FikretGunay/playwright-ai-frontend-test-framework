# Requirements Specification: Registration Form

| Field | Value |
|---|---|
| Document ID | REQ-DOC-001 |
| Product | Registration form (`index.html`) |
| Version | 1.0 |
| Date | 2026-10-22 |
| Status | Baseline |

## 1. Purpose
Define the functional and non-functional requirements of a single-page registration form that collects four fields (Name, Email, Password, Age), validates them on the client side and gives the user clear feedback.

## 2. Scope
**In scope:** client-side field validation, error display, success message, form behavior on repeated submission.

**Out of scope:** server-side processing, data persistence, authentication, email verification, password strength rules beyond minimum length, localization (UI language is English only), accessibility certification.

## 3. Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| REQ-001 | The Name field is mandatory. A value that is empty or contains only whitespace is invalid. Error: `Name is required.` | High |
| REQ-002 | The Email field is mandatory and must have a valid format (`local@domain.suffix`, no whitespace). Errors: `Email is required.` (empty), `Email format is invalid.` (wrong format). | High |
| REQ-003 | The Password field is mandatory and must contain at least 8 characters. Errors: `Password is required.` (empty), `Password must be at least 8 characters.` (1 to 7 characters). | High |
| REQ-004 | The Age field is mandatory and must be a number from 18 to 65, both limits inclusive. Errors: `Age is required.` (empty), `Age must be between 18 and 65.` (outside range). | High |
| REQ-005 | On submit, all validation errors are shown in a single error list below the form: one entry per invalid field, in field order (Name, Email, Password, Age). | High |
| REQ-006 | When all fields are valid, the message `Registration successful` is shown and the error list is hidden. | High |
| REQ-007 | Every submission resets the feedback of the previous submission. Old errors and the old success message must not remain visible. | Medium |

## 4. Non-Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| NFR-001 | Key interactive and feedback elements expose `data-testid` attributes so they can be automated reliably. | Medium |
| NFR-002 | The page works in current Chromium-based browsers when opened directly from the file system. | Medium |

## 5. Assumptions and Open Questions
- **A-1:** Age is validated as a number. Decimal values (for example `18.5`) are not addressed by the requirements. Open question OQ-1.
- **A-2:** Maximum field lengths are not specified. Open question OQ-2.
- **OQ-1:** Should decimal ages be rejected?
- **OQ-2:** Is there a maximum length for Name, Email and Password?
- **OQ-3:** Should leading and trailing whitespace in Email be trimmed or rejected?

## 6. Traceability
Requirements are linked to user stories in `user-stories.md`, to acceptance criteria in `acceptance-criteria.md` and to test cases in `docs/testing/test-plan.md` (section 11).
