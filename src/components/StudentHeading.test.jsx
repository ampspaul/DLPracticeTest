import React from 'react';
import { render, screen } from '@testing-library/react';
import StudentHeading from './StudentHeading';

describe('StudentHeading', () => {
  it('renders without crashing', () => {
    render(<StudentHeading />);
  });

  it('displays default student name when no name provided', () => {
    render(<StudentHeading />);
    expect(screen.getByText('Student')).toBeInTheDocument();
  });

  it('displays provided student name', () => {
    render(<StudentHeading studentName="Jane Doe" />);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  it('displays default test title when no title provided', () => {
    render(<StudentHeading />);
    expect(screen.getByText('Practice Test')).toBeInTheDocument();
  });

  it('displays provided test title', () => {
    render(<StudentHeading testTitle="TN Driver License Test" />);
    expect(screen.getByText('TN Driver License Test')).toBeInTheDocument();
  });

  it('does not display score section when score is null', () => {
    render(<StudentHeading />);
    expect(screen.queryByText(/Score:/)).not.toBeInTheDocument();
  });

  it('displays score when provided', () => {
    render(<StudentHeading score={85} />);
    expect(screen.getByText('Score: 85')).toBeInTheDocument();
  });

  it('has correct aria-label on student name', () => {
    render(<StudentHeading studentName="John Smith" />);
    expect(screen.getByLabelText('Student: John Smith')).toBeInTheDocument();
  });

  it('has banner role for accessibility', () => {
    render(<StudentHeading />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});