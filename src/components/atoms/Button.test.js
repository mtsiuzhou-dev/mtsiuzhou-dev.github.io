import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button:', () => {
  const text = 'test';

  test('should render with text', () => {
    render(<Button text={text} />);

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  test('onClick should be called', () => {
    const mockOnClick = jest.fn();
    render(<Button text={text} onClick={mockOnClick} />);
    userEvent.click(screen.getByText(text));

    expect(mockOnClick).toHaveBeenCalled();
  });
});
