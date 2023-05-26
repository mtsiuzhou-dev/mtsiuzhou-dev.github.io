import PropTypes from 'prop-types';
import style from './Checkbox.module.scss';

const Checkbox = ({
  id,
  className = '',
  isChecked = false,
  onChange = null,
}) => (
  <input
    id={id}
    type="checkbox"
    className={`${style.checkbox} ${className}`}
    defaultChecked={isChecked}
    onChange={onChange}
  />
);
Checkbox.defaultProps = {
  isChecked: false,
  onChange: null,
  className: null,
};
Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  isChecked: PropTypes.bool,
  onChange: PropTypes.func,
};
export default Checkbox;
