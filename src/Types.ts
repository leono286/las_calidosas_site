import type { Asset, Entry, EntryFields } from "contentful";

export interface TypeDeliveryPlatformFields {
    name: EntryFields.Symbol;
    url: EntryFields.Symbol;
    logo: Asset;
}

export type TypeDeliveryPlatform = Entry<TypeDeliveryPlatformFields>;

export interface TypeFooterFields {
    name?: EntryFields.Symbol;
    deliveryPlatformsList?: Entry<TypeDeliveryPlatformFields>[];
}

export type TypeFooter = Entry<TypeFooterFields>;

export interface TypeMenuFields {
    categories: Entry<TypeMenuCategoryFields>[];
    featuredMenuItemsSlider?: Entry<TypePicturesSliderFields>;
}

export type TypeMenu = Entry<TypeMenuFields>;

export interface TypeMenuCategoryFields {
    name: EntryFields.Symbol;
    englishName?: EntryFields.Symbol;
    products: Entry<TypeMenuItemFields>[];
    pictureSlider?: Entry<TypePicturesSliderFields>;
}

export type TypeMenuCategory = Entry<TypeMenuCategoryFields>;

export interface TypeMenuItemFields {
    name: EntryFields.Symbol;
    spanishDescription?: EntryFields.Text;
    englishDescription?: EntryFields.Text;
    listOfItems?: EntryFields.Symbol[];
    price: EntryFields.Number;
    isNew?: EntryFields.Boolean;
}

export type TypeMenuItem = Entry<TypeMenuItemFields>;

export interface TypePictureSliderItemFields {
    name: EntryFields.Symbol;
    description?: EntryFields.Symbol;
    image: Asset;
}

export type TypePictureSliderItem = Entry<TypePictureSliderItemFields>;

export interface TypePicturesSliderFields {
    name?: EntryFields.Symbol;
    items?: Entry<TypePictureSliderItemFields>[];
}

export type TypePicturesSlider = Entry<TypePicturesSliderFields>;
