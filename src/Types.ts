import * as Contentful from "contentful";

export interface TypeMenuFields {
  categories: Contentful.Entry<TypeMenuCategoryFields>[];
}

export type TypeMenu = Contentful.Entry<TypeMenuFields>;

export interface TypeMenuCategoryFields {
  name: Contentful.EntryFields.Symbol;
  englishName?: Contentful.EntryFields.Symbol;
  products: Contentful.Entry<TypeMenuItemFields>[];
}

export type TypeMenuCategory = Contentful.Entry<TypeMenuCategoryFields>;

export interface TypeMenuItemFields {
  name: Contentful.EntryFields.Symbol;
  spanishDescription?: Contentful.EntryFields.Text;
  englishDescription?: Contentful.EntryFields.Text;
  listOfItems?: Contentful.EntryFields.Symbol[];
  price: Contentful.EntryFields.Number;
  isNew?: Contentful.EntryFields.Boolean;
}

export type TypeMenuItem = Contentful.Entry<TypeMenuItemFields>;
