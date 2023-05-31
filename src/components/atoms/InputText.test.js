import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import InputText from './InputText';

describe('InputText:', () => {
  const id = 'InputTextId';

  test('renders correctly', () => {
    const inputText = renderer
      .create(<InputText id={id} onChange={jest.fn()} />)
      .toJSON();
    expect(inputText).toMatchSnapshot();
  });

  test('onChange should be called', () => {
    const mockOnChange = jest.fn();
    render(<InputText id={id} onChange={mockOnChange} />);
    userEvent.type(screen.getByRole('textbox'), 'typing');

    expect(mockOnChange).toHaveBeenCalled();
  });

  test('onBlur should be called', () => {
    const mockOnBlur = jest.fn();
    render(<InputText id={id} onChange={jest.fn()} onBlur={mockOnBlur} />);
    userEvent.type(screen.getByRole('textbox'), 'typing');

    expect(mockOnBlur).not.toHaveBeenCalled();
    userEvent.tab();
    expect(mockOnBlur).toHaveBeenCalled();
  });

  test('placeholder should be correct', () => {
    const placeholder = 'placeholder1';
    render(
      <InputText id={id} onChange={jest.fn()} placeholder={placeholder} />
    );

    expect(screen.getByRole('textbox').placeholder).toBe(placeholder);
  });
});
