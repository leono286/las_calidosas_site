import MenuItem from '@/components/MenuItem'
import { mapCategoryToSVG, toCapitalFirstLetter, toLowerCase } from '@/helpers'
import { TypeMenuCategory } from '@/Types'
import { createClient } from 'contentful'
import styles from './../styles/Menu.module.scss'
import LogoSVG from './../assets/svg/logo.svg'
import ScrollSpy from 'react-scrollspy'
import { useEffect, useState } from 'react'

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  })

  const res = await client.getEntries<TypeMenuCategory>({
    content_type: 'menuCategory',
  })

  return {
    props: { categories: res.items },
  }
}

const scrollspyOffset = -200

export default function Menu({
  categories,
}: {
  categories: TypeMenuCategory[]
}) {
  const [isMenuScroll, setIsMenuScroll] = useState(false)

  useEffect(() => {
    if (isMenuScroll) {
      setTimeout(() => {
        setIsMenuScroll(false)
      }, 600)
    }
  }, [isMenuScroll])

  const orderedCategories = categories.sort(
    (a, b) => a.fields.order - b.fields.order,
  )

  const categoriesNames = orderedCategories.map((category) =>
    toLowerCase(category.fields.name),
  )

  const handleNavClick = (e: React.SyntheticEvent<HTMLElement>) => {
    const targetId = (e.target as HTMLElement).dataset['target']

    setIsMenuScroll(true)
    targetId && scrollToTarget(targetId)
    targetId && scrollToCenterNavItem(targetId)
  }

  const scrollToTarget = (targetId: string) => {
    const targetSection = targetId && document.getElementById(targetId)

    if (targetSection) {
      const y =
        targetSection.getBoundingClientRect().top +
        window.pageYOffset +
        scrollspyOffset

      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  function sideScroll(
    element: Element,
    direction: 'left' | 'right',
    distance: number,
    duration: number
  ) {
    
    let scrollAmount = 0
    const step = 2;
    const speed = duration / (distance / step)
    
    let slideTimer = setInterval(function () {
      if (direction == 'left') {
        element.scrollLeft -= step
      } else {
        element.scrollLeft += step
      }
      scrollAmount += step
      if (scrollAmount >= distance) {
        window.clearInterval(slideTimer)
      }
    }, speed)
  }

  const scrollToCenterNavItem = (targetValue: string) => {
    const targetItem = document
      .querySelector('.scrollspy')
      ?.querySelector(`[data-target=${targetValue}]`)

    const parentItem = targetItem?.parentElement

    if (!parentItem || parentItem?.scrollWidth - parentItem?.offsetWidth < 12)
      return
    
    const mainContainerWidth = document
      .querySelector('main')
      ?.getBoundingClientRect().width

    const targetRect = targetItem?.getBoundingClientRect()
    if (targetItem && targetRect && mainContainerWidth && parentItem) {
      const distance =
        targetRect.left + targetRect.width / 2 - mainContainerWidth / 2
      const direction = distance < 0 ? 'left' : 'right'
      sideScroll(parentItem, direction, Math.abs(distance), 80)
    }
  }

  const onScrollspyUpdate = (e: HTMLElement) => {
    if (isMenuScroll) return
    const dataTargetValue = e.id
    dataTargetValue && scrollToCenterNavItem(dataTargetValue)
  }

  return (
    <>
      <div className={styles.title}>
        <LogoSVG className={styles.logo} />
        <span>Menú</span>
        <div className={styles.separator} role='presentation' />
      </div>
      <ScrollSpy
        items={categoriesNames}
        componentTag='div'
        currentClassName={styles.current}
        className={styles.scrollspy + ' scrollspy'}
        offset={scrollspyOffset}
        onUpdate={onScrollspyUpdate}
      >
        {categoriesNames.map((categoryName) => (
          <button
            key={categoryName}
            className={styles.navItem}
            data-target={categoryName}
            onClick={handleNavClick}
          >
            {toCapitalFirstLetter(categoryName)}
          </button>
        ))}
      </ScrollSpy>
      <div className={styles.content}>
        {orderedCategories.map((category, index) => {
          const TitleSVG = mapCategoryToSVG(category.fields.name)

          return (
            <>
              <section
                className={styles.menuCategory}
                key={category.sys.id}
                id={categoriesNames[index]}
              >
                <h3 className={styles.menuCategoryName}>
                  {TitleSVG ? <TitleSVG /> : category.fields.name}
                </h3>
                {category.fields.products.map((product) => (
                  <MenuItem key={product.sys.id} item={product} />
                ))}
                <div className={styles.separator} role='presentation' />
              </section>
            </>
          )
        })}
      </div>
    </>
  )
}
