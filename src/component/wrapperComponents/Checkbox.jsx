import classes from './Checkbox.module.scss';

function Checkbox({ checked, text, id, onChange }) {
  return (
    <div className={classes.content__transfer}>
      <input
        onChange={onChange}
        type="checkbox"
        className={classes.input__checkbox}
        id={id}
        checked={checked}
      />
      <label htmlFor={id}>
        <span className={classes.text}>{text}</span>
      </label>
    </div>
  );
}

export default Checkbox;
