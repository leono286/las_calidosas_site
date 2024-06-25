import styles from './BrushStrokeText.module.scss';
import yellowBrushStroke from '@/assets/yellow-brush-stroke.png';

interface Props extends React.HTMLProps<HTMLDivElement> {
  color?: 'yellow' | 'white';
  text: string;
  elementSize?: 'medium' | 'large';
}

function BrushStrokeText({ color, text, elementSize = 'medium', className ,...props }: Props) {
  return (
    <div className={`${styles.container} ${styles[elementSize]} ${className}`}>
      <p className={styles.text}>{text}</p>
    </div>
  );
}

export default BrushStrokeText;