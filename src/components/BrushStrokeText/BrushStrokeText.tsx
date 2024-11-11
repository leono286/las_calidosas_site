import styles from './BrushStrokeText.module.scss';
import yellowBrushStroke from '@/assets/yellow-brush-stroke.png';

interface Props extends React.HTMLProps<HTMLDivElement> {
  color?: 'yellow' | 'white' | 'black';
  text: string;
  elementSize?: 'medium' | 'large'|'special-size';
}

function BrushStrokeText({ color="yellow", text, elementSize = 'medium', ...props }: Props) {
  return (
    <div className={`${styles.container} ${styles[elementSize]} ${styles[color]}`}>
      <p className={styles.text}>{text}</p>
    </div>
  );
}

export default BrushStrokeText;
