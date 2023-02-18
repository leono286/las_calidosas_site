import HamburgesasSVG from '@/assets/svg/hamburguesas.svg'
import PerrosSVG from '@/assets/svg/perros.svg'
import SalchipapasSVG from '@/assets/svg/salchipapas.svg'
import MaicitosSVG from '@/assets/svg/maicitos.svg'
import BebidasSVG from '@/assets/svg/bebidas.svg'
import ChuzosSVG from '@/assets/svg/chuzos.svg'

export function mapCategoryToSVG(category: string) {
  const lowercaseCategory = toLowerCase(category);

  type SVGElement = React.FC<React.SVGProps<SVGSVGElement>>;

  switch (lowercaseCategory) {
    case 'hamburguesas':
      return HamburgesasSVG as SVGElement;
    
    case 'perros':
      return PerrosSVG as SVGElement;
    
    case 'salchipapas':
      return SalchipapasSVG as SVGElement;
    
    case 'maicitos':
      return MaicitosSVG as SVGElement;
    
    case 'bebidas':
      return BebidasSVG as SVGElement;
   
    case 'chuzos':
      return ChuzosSVG as SVGElement;
    
    default:
      return null;
  }
}

export function toLowerCase(s: string) {
  return s.toLowerCase();
}

export function toUpperCase(s: string) {
  return s.toUpperCase();
}

export function toCapitalFirstLetter(s: string) {
  return `${s[0].toUpperCase()}${s.substring(1)}`
}
