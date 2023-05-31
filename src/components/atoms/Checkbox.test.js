import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import Checkbox from './Checkbox';

describe('Checkbox:', () => {
  const id = 'checkboxId';

  test('renders correctly', () => {
    const checkbox = renderer.create(<Checkbox id={id} />).toJSON();
    expect(checkbox).toMatchSnapshot();
  });

  test('onChange should be called', () => {
    const mockOnChange = jest.fn();
    render(<Checkbox id={id} onChange={mockOnChange} />);
    userEvent.click(screen.getByRole('checkbox'));

    expect(mockOnChange).toHaveBeenCalled();
  });
});
