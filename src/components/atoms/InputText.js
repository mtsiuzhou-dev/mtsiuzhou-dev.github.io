import PropTypes from 'prop-types';
import style from './InputText.module.scss';

const InputText = ({
  id,
  value,
  placeholder = null,
  onChange = null,
  onBlur = null,
  innerRef = null,
}) => (
  <input
    id={id}
    className={style.inputText}
    type="text"
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    ref={innerRef}
    placeholder={placeholder}
    autoComplete="off"
    maxLength="75"
  />
);
InputText.defaultProps = {
  onChange: null,
  onBlur: null,
  innerRef: null,
  placeholder: null,
};
InputText.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};
export default InputText;
