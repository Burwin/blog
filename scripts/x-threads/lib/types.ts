export interface Tweet {
  text: string;
  id?: string;
}

export interface ThreadDoc {
  slug: string;
  url: string;
  title?: string;
  status: 'draft' | 'published';
  tweets: Tweet[];
}

// future:
export interface PostMeta {
  id: string;
  date: string;
  title: string;
  excerpt: string;
}

export interface Config {
  goLiveDate: string;
  siteUrl: string;
}
