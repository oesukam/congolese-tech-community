import slug from 'slug';
import uniqueSlug from 'unique-slug';

const slugString = text => `${slug(text.toLowerCase())}-${uniqueSlug()}`;

export default slugString;
