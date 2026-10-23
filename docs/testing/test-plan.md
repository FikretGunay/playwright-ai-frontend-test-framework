# Test Plan: Registration Form

| Field | Value |
|---|---|
| Document ID | TP-001 |
| Version | 1.0 |
| Date | 2026-10-22 |
| Author | QA (test engineer) |
| Status | Draft for review |

## 1. Introduction
This plan describes how the registration form (`index.html`) will be tested: scope, approach, environment, entry and exit criteria, risks and deliverables. The requirements are defined in `docs/requirements/`.

## 2. Test Objectives
- Verify that every validation rule (REQ-001 to REQ-004) behaves as specified, including boundary values.
- Verify the feedback behavior (REQ-005 to REQ-007): error list, success message and reset on resubmission.
- Detect defects early and report them with enough detail to reproduce.
- Provide an automated regression suite that can be rerun after each change.

## 3. Scope

### In scope
- Field validation: Name, Email, Password, Age
- Error list content, order and visibility
- Success message behavior
- Repeated submission behavior
- Functional testing in Chromium

### Out of scope
- Server-side behavior and data persistence (not implemented)
- Performance, load and security testing
- Formal accessibility audit
- Cross-browser execution on Firefox and WebKit (planned as a later cycle)
- Mobile devices

## 4. Test Approach

| Technique | Application |
|---|---|
| Equivalence partitioning | Valid and invalid partitions per field, for example Age: below 18, 18 to 65, above 65, empty |
| Boundary value analysis | Password 7/8 characters, Age 17/18/65/66 |
| Negative testing | Empty, whitespace-only, malformed and out-of-range input |
| State-transition thinking | Error to success and success to error on repeated submissions |
| Exploratory testing | Decimal age, very long input, unusual characters, keyboard-only use |

**Automation:** Playwright (TypeScript), tests in `tests/e2e/registration.spec.ts`, run with `npx playwright test`. The page is opened through a `file://` URL and elements are located by `data-testid`.

**Manual:** exploratory sessions and checks that are not reliably automatable (for example text typed into a number field).

**Test case rules:** one behavior per test case, English text, IDs in the format TC-001, defect IDs in the format BUG-001.

## 5. Test Environment

| Item | Value |
|---|---|
| OS | Windows 11 Pro |
| Browser | Chromium (Playwright headless shell 156.0.8078.4) |
| Test tool | Playwright Test (`@playwright/test`), Node.js v26.12.0 |
| Application | `index.html` opened from the file system |
| Test data | Defined per test case; base valid record: Anna Svensson / anna@example.com / password123 / 30 |

## 6. Entry Criteria
- Requirements, user stories and acceptance criteria are baselined.
- `index.html` is available and loads without console errors.
- Playwright and Chromium are installed and the suite runs.

## 7. Exit Criteria
- 100% of High priority test cases are executed.
- No open Critical or Major defects.
- All failed test cases are linked to a defect report or a documented decision.
- A test report for the cycle is written.

## 8. Test Deliverables
- Requirements, user stories, acceptance criteria (`docs/requirements/`)
- This test plan
- Test cases `TC-001` to `TC-021` (`docs/testing/test-cases/`)
- Automated suite (`tests/e2e/`)
- Defect reports (`docs/testing/defects/`) and test reports (`docs/testing/test-reports/`) when created

## 9. Risks and Mitigations

| ID | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R-1 | Requirements leave decimal age and maximum lengths undefined | High | Medium | Raise open questions OQ-1, OQ-2; test exploratively until clarified |
| R-2 | Automated tests that reuse one invalid value for setup can fail for the wrong reason | Medium | Medium | Keep tests independent; review shared test data |
| R-3 | Only Chromium is covered | Medium | Medium | Plan Firefox and WebKit as a follow-up cycle |
| R-4 | Validation logic changes without regression run | Medium | High | Run the full suite before every release |

## 10. Roles
- **Test engineer:** designs test cases, executes tests, reports defects, owns this plan.
- **Developer:** fixes defects, answers requirement questions.

## 11. Traceability Matrix

| Requirement | Acceptance criteria | Test cases |
|---|---|---|
| REQ-001 | AC-003, AC-004 | TC-002, TC-003 |
| REQ-002 | AC-005, AC-006 | TC-004, TC-005, TC-006, TC-021 |
| REQ-003 | AC-007, AC-008, AC-009 | TC-007, TC-008, TC-009 |
| REQ-004 | AC-010 to AC-014 | TC-010 to TC-016, TC-020 |
| REQ-005 | AC-015 | TC-017 |
| REQ-006 | AC-001, AC-002 | TC-001 |
| REQ-007 | AC-016, AC-017 | TC-018, TC-019 |

## 12. Schedule
Cycle 1 (2026-10-22): full automated run of the suite. Manual exploratory session and cross-browser run are to be scheduled.

## 13. Cycle 1 Status
Automated suite: 21 tests executed, 18 passed, 3 failed. Failures relate to Age below 18 being accepted (TC-011, TC-016, defect BUG-001) and to a test (TC-018) whose setup uses age 17. See the individual test case files for details.
