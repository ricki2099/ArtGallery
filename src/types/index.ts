export type Painting = {
  id: string;
  title: string;
  image: string;
  description?: string;
  artist?: string;
  technique?: string;
  year?: number;
  dimensions?: string;
};

export type RootStackParamList = {
  Home: undefined;
  Detail: { painting: Painting };
};

export type DrawerParamList = {
  MainStack: undefined;
  Help: undefined;
  AboutUs: undefined;
  Contact: undefined;
};
