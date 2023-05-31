import PropTypes from 'prop-types';
import style from './InputText.module.scss';

const InputText = ({
  id,
  value = '',
  placeholder = '',
  onChange,
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
  value: '',
  placeholder: '',
  onBlur: null,
  innerRef: null,
};
InputText.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};
export default InputText;
