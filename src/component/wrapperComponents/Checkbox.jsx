import classes from './Checkbox.module.scss';

function Checkbox({ text, id, classNameItem, ...props }) {
  return (
    <div className={classes.content__transfer}>
      <input {...props} type="checkbox" className={classes['input__checkbox']} id={id} />
      <label htmlFor={id}>
        <span className={classes.text}>{text}</span>
      </label>
    </div>
  );
}

export default Checkbox;
