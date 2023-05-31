import PropTypes from 'prop-types';
import style from './Checkbox.module.scss';

const Checkbox = ({ id, className = '', isChecked = false, onChange = '' }) => (
  <input
    id={id}
    type="checkbox"
    className={`${style.checkbox} ${className || ''}`.trim()}
    defaultChecked={isChecked}
    onChange={onChange}
  />
);
Checkbox.defaultProps = {
  className: '',
  isChecked: false,
  onChange: null,
};
Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  isChecked: PropTypes.bool,
  onChange: PropTypes.func,
};
export default Checkbox;
