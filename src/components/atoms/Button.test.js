import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import Button from './Button';

describe('Button:', () => {
  const text = 'test';

  test('renders correctly', () => {
    const button = renderer.create(<Button text={text} />).toJSON();
    expect(button).toMatchSnapshot();
  });

  test('onClick should be called', () => {
    const mockOnClick = jest.fn();
    render(<Button text={text} onClick={mockOnClick} />);
    userEvent.click(screen.getByText(text));

    expect(mockOnClick).toHaveBeenCalled();
  });
});
