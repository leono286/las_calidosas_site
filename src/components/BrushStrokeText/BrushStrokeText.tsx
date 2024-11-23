import styles from './BrushStrokeText.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {
  color?: 'yellow' | 'white' | 'black';
  text: string;
  elementSize?: 'medium' | 'large'|'special-size';
}

function BrushStrokeText({ color="yellow", text, elementSize = 'medium', className, ...props }: Props) {
  return (
    <div className={`${styles.container} ${styles[elementSize]} ${styles[color]} ${className}`}>
      <p className={styles.text}>{text}</p>
    </div>
  );
}

export default BrushStrokeText;
