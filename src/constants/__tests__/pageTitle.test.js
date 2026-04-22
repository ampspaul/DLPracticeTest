/**
 * Unit tests for the pageTitle constants.
 */
import { PRACTICE_TEST_PAGE_TITLE, PRACTICE_TEST_META_DESCRIPTION } from '../pageTitle';

describe('pageTitle constants', () => {
  it('PRACTICE_TEST_PAGE_TITLE equals the required value', () => {
    expect(PRACTICE_TEST_PAGE_TITLE).toBe('Tennessee Driver Licence Practice Test');
  });

  it('PRACTICE_TEST_META_DESCRIPTION mentions Tennessee Driver Licence', () => {
    expect(PRACTICE_TEST_META_DESCRIPTION).toMatch(/Tennessee Driver Licence/i);
  });
});