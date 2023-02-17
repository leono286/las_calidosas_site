import * as Contentful from "contentful";

export interface TypeMenuCategoryFields {
  name: Contentful.EntryFields.Symbol;
  order: Contentful.EntryFields.Integer;
  image?: Contentful.Asset;
  products: Contentful.Entry<TypeMenuItemFields>[];
}

export type TypeMenuCategory = Contentful.Entry<TypeMenuCategoryFields>;

export interface TypeMenuItemFields {
  name: Contentful.EntryFields.Symbol;
  spanishDescription: Contentful.EntryFields.Text;
  englishDescription?: Contentful.EntryFields.Text;
  price: Contentful.EntryFields.Integer;
}

export type TypeMenuItem = Contentful.Entry<TypeMenuItemFields>;

export type categoryName = 'hamburguesas' | 'perros' | 'salchipapas' | 'maicitos' | 'bebidas';
