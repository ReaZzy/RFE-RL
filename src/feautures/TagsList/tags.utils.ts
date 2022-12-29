import { z } from 'zod';

export const tagValidationSchema = z
  .string({
    required_error: 'Tag name is required',
    invalid_type_error: 'Tag name must be a string',
  })
  .min(1, 'Tag name minimum length is 1 character')
  .max(64, 'Tag name maximum length is 64 characters')
  .trim();

export type TagType = z.infer<typeof tagValidationSchema>;

export const getTagsFromUrlHash = (url: string): Array<string> => {
  const tagsRegex = /#tags=([^#&]+)/gi;
  const result = [];
  let tags = tagsRegex.exec(url);
  while (tags !== null) {
    result.push(tags?.[1].split(','));
    tags = tagsRegex.exec(url);
  }
  return result.flat();
};
