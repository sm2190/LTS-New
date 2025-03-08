export interface AudioLecture {
  id: string;
  title: string;
  duration: string;
  url: string;
  description?: string;
}

export interface Series {
  id: string;
  title: string;
  lectures: AudioLecture[];
}

export interface SubCategory {
  id: string;
  title: string;
  series: Series[];
}

export interface Category {
  id: string;
  title: string;
  icon: string;
  subCategories?: SubCategory[];
  series?: Series[];
}

export interface Scholar {
  id: string;
  name: string;
  image: string;
  categories: Category[];
}