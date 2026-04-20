import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from './HomePage';

const EXPECTED_TITLE = 'TN Driver Licence Practice Test';

describe('HomePage — h1 title rendering', () => {
  beforeEach(() => {
    document.title = '';
  });

  test('renders exactly one h1 element', () => {
    render(<HomePage onStart={() => {}} />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
  });

  test('h1 element has exact text "TN Driver Licence Practice Test"', () => {
    render(<HomePage onStart={() => {}} />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H1');
    expect(heading.textContent).toBe(EXPECTED_TITLE);
  });

  test('h1 text is exactly correct — no casing or spelling variation', () => {
    render(<HomePage onStart={() => {}} />);
    const heading = screen.getByRole('heading', { level: 1 });
    // Strict equality — not case-insensitive, not partial
    expect(heading.textContent).toBe(EXPECTED_TITLE);
    expect(heading.textContent).not.toBe('TN Driver License Practice Test'); // wrong spelling
    expect(heading.textContent).not.toBe('tn driver licence practice test'); // wrong casing
    expect(heading.textContent).not.toBe('TN Driver Licence Practice Test '); // no trailing space
  });

  test('h1 is queryable by its exact text via getByText', () => {
    render(<HomePage onStart={() => {}} />);
    const heading = screen.getByText(EXPECTED_TITLE);
    expect(heading.tagName).toBe('H1');
  });

  test('h1 element has className "home-page__title"', () => {
    render(<HomePage onStart={() => {}} />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('home-page__title');
  });
});

describe('HomePage — document.title (browser tab title)', () => {
  beforeEach(() => {
    document.title = '';
  });

  test('sets document.title to "TN Driver Licence Practice Test" on mount', () => {
    render(<HomePage onStart={() => {}} />);
    expect(document.title).toBe(EXPECTED_TITLE);
  });

  test('document.title is exactly correct — no spelling variation', () => {
    render(<HomePage onStart={() => {}} />);
    expect(document.title).toBe(EXPECTED_TITLE);
    expect(document.title).not.toBe('TN Driver License Practice Test');
  });

  test('document.title is set even when initial title was different', () => {
    document.title = 'Some Other Title';
    render(<HomePage onStart={() => {}} />);
    expect(document.title).toBe(EXPECTED_TITLE);
  });
});

describe('HomePage — structure and other elements', () => {
  test('renders description paragraph', () => {
    render(<HomePage onStart={() => {}} />);
    const description = screen.getByText(
      'Prepare for your Tennessee driver licence exam with our practice test.'
    );
    expect(description).toBeInTheDocument();
    expect(description.tagName).toBe('P');
  });

  test('renders Start Test button', () => {
    render(<HomePage onStart={() => {}} />);
    const button = screen.getByRole('button', { name: /Start the TN Driver Licence Practice Test/i });
    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe('Start Test');
  });

  test('Start Test button has correct aria-label', () => {
    render(<HomePage onStart={() => {}} />);
    const button = screen.getByRole('button', { name: 'Start the TN Driver Licence Practice Test' });
    expect(button).toHaveAttribute('aria-label', 'Start the TN Driver Licence Practice Test');
  });

  test('calls onStart when Start Test button is clicked', () => {
    const mockOnStart = jest.fn();
    render(<HomePage onStart={mockOnStart} />);
    const button = screen.getByRole('button', { name: /Start the TN Driver Licence Practice Test/i });
    fireEvent.click(button);
    expect(mockOnStart).toHaveBeenCalledTimes(1);
  });

  test('root element has className "home-page"', () => {
    const { container } = render(<HomePage onStart={() => {}} />);
    expect(container.firstChild).toHaveClass('home-page');
  });
});

describe('HomePage — DOM tag inspection', () => {
  test('h1 is the primary heading — not h2, h3, or other tag', () => {
    render(<HomePage onStart={() => {}} />);
    // Confirm no h2 contains the title text
    const allH2 = document.querySelectorAll('h2');
    const titleInH2 = Array.from(allH2).find(el => el.textContent === EXPECTED_TITLE);
    expect(titleInH2).toBeUndefined();

    // Confirm the title IS in an h1
    const allH1 = document.querySelectorAll('h1');
    const titleInH1 = Array.from(allH1).find(el => el.textContent === EXPECTED_TITLE);
    expect(titleInH1).toBeDefined();
  });

  test('page contains exactly one h1 and the title text matches', () => {
    const { container } = render(<HomePage onStart={() => {}} />);
    const h1Elements = container.querySelectorAll('h1');
    expect(h1Elements).toHaveLength(1);
    expect(h1Elements[0].textContent).toBe(EXPECTED_TITLE);
  });
});