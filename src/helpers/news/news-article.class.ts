import { IAuthor, IImage } from '../contentful';

export class NewsArticle {
  public author: IAuthor;
  public background: IImage;
  public body: Document;
  public date: string;
  public id: string;
  public photos?: IImage[];
  public slug: string;
  public tags: string[];
  public thumb: IImage;
  public title: string;

  constructor({ sys, fields }) {
    const { author, background, body, date, slug, tags, thumb, title } = fields;

    this.body = body;
    this.date = date;
    this.id = sys.id;
    this.slug = slug;
    this.title = title;

    this.photos = fields.photos
      ? fields.photos.map(p => ({
          height: p.fields.file.details.image.height,
          name: p.fields.title,
          url: p.fields.file.url,
          width: p.fields.file.details.image.width,
        }))
      : null;

    this.author = {
      avatar: {
        height: author.fields.avatar.fields.file.details.image.height,
        name: author.fields.avatar.fields.title,
        url: author.fields.avatar.fields.file.url,
        width: author.fields.avatar.fields.file.details.image.width,
      },
      email: author.fields.email,
      id: author.sys.id,
      name: author.fields.name,
    };

    this.background = {
      height: background.fields.file.details.image.height,
      name: background.fields.title,
      url: background.fields.file.url,
      width: background.fields.file.details.image.width,
    };

    this.tags = tags.map(t => t.fields.name);

    this.thumb = {
      height: thumb.fields.file.details.image.height,
      name: thumb.fields.title,
      url: thumb.fields.file.url,
      width: thumb.fields.file.details.image.width,
    };
  }
}
