import PropTypes from 'prop-types';
import style from './Button.module.scss';

const Button = ({
  isSubmit = false,
  text,
  className = '',
  onClick = null,
  isPressed = false,
  innerRef = null,
}) => (
  <button
    aria-pressed={isPressed}
    type={isSubmit ? 'submit' : 'button'}
    className={`${style.button} ${className || ''}`.trim()}
    onClick={onClick}
    ref={innerRef}
  >
    {text}
  </button>
);
Button.defaultProps = {
  isSubmit: false,
  onClick: null,
  isPressed: false,
  className: '',
  innerRef: null,
};
Button.propTypes = {
  isSubmit: PropTypes.bool,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  isPressed: PropTypes.bool,
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};
export default Button;
