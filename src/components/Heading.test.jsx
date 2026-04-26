import React from 'react';
import { render, screen } from '@testing-library/react';
import Heading from './Heading';

describe('Heading component', () => {
  let headingElement;

  beforeEach(() => {
    render(<Heading />);
    headingElement = screen.getByRole('heading', { level: 1 });
  });

  test('renders the correct heading text', () => {
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.textContent).toBe('TN Student Practice Test');
  });

  test('applies Dark Blue color #00008B', () => {
    expect(headingElement.style.color).toBe('#00008B') ||
    expect(headingElement.style.color).toBe('rgb(0, 0, 139)');
  });

  test('applies font-weight of 700', () => {
    expect(headingElement.style.fontWeight).toBe('700');
  });

  test('applies font-style of italic', () => {
    expect(headingElement.style.fontStyle).toBe('italic');
  });

  test('does not use the old Dark Red color #8B0000', () => {
    expect(headingElement.style.color).not.toBe('#8B0000');
    expect(headingElement.style.color).not.toBe('rgb(139, 0, 0)');
  });

  test('heading color is exactly Dark Blue and not Dark Red', () => {
    const color = headingElement.style.color;
    // Accept either hex or rgb representation of #00008B
    const isDarkBlue = color === '#00008B' || color === 'rgb(0, 0, 139)';
    expect(isDarkBlue).toBe(true);
  });
});