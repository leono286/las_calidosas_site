import MenuItem from '@/components/MenuItem'
import { mapCategoryToSVG, toCapitalFirstLetter, toLowerCase } from '@/helpers'
import { TypeMenuCategory } from '@/Types'
import { createClient } from 'contentful'
import styles from './../styles/Menu.module.scss'
import LogoSVG from './../assets/svg/logo.svg'
import ScrollSpy from 'react-scrollspy'

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

const scrollspyOffset = -100

export default function Menu({
  categories,
}: {
  categories: TypeMenuCategory[]
}) {
  const orderedCategories = categories.sort(
    (a, b) => a.fields.order - b.fields.order,
  )

  const categoriesNames = orderedCategories.map((category) =>
    toLowerCase(category.fields.name),
  )

  const scrollToTarget = (e: React.SyntheticEvent<HTMLLIElement>) => {
    const targetId = (e.target as HTMLElement).dataset['target']
    const targetSection = targetId && document.getElementById(targetId)

    if (targetSection) {
      const y =
        targetSection.getBoundingClientRect().top +
        window.pageYOffset +
        scrollspyOffset

      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  const onScrollspyUpdate = (e: any) => {
    const dataTargetValue = e.id
    const targetItem = document
      .querySelector('.scrollspy')
      ?.querySelector(`[data-target=${dataTargetValue}]`)

    const parentItem = targetItem?.parentElement
    const mainContainerWidth = document.querySelector('main')?.getBoundingClientRect().width

    const targetRect = targetItem?.getBoundingClientRect()
    console.log(targetRect?.width)
    if (targetItem && targetRect && mainContainerWidth && parentItem) {
      const distance = targetRect.left + targetRect.width / 2 - mainContainerWidth / 2
      console.log(distance)
      parentItem.scrollLeft += distance
    }
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
        currentClassName={styles.current}
        className={styles.scrollspy + ' scrollspy'}
        offset={scrollspyOffset}
        onUpdate={onScrollspyUpdate}
      >
        {categoriesNames.map((categoryName) => (
          <li
            key={categoryName}
            className={styles.navItem}
            data-target={categoryName}
            onClick={scrollToTarget}
          >
            {toCapitalFirstLetter(categoryName)}
          </li>
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
