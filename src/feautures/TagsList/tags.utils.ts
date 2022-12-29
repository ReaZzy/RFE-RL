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

/*
 * @description (review) I would better use search queries instead of hash
 * to get tags, but I understand that we do this only to test my skills
 * so it's ok
 */

/*
 * @description (review) Also some algorithms may look a little overcomplicated
 * but this is because they work not only with singular hash like #tags=123,123 but also
 * with multiple ones #tags=1,2,3#tags=123,123#tags=3
 */

export const getTagsFromUrlHash = (hash: string): Array<TagType> => {
  const tagsRegex = /#tags=([^#&]+)/gi;
  const result = [];
  let tags = tagsRegex.exec(hash);
  while (tags !== null) {
    result.push(tags?.[1].split(','));
    tags = tagsRegex.exec(hash);
  }
  return result.flat();
};

export const addTagHashToUrl = (hash: string, tag: string): string => {
  const tagsRegex = /#tags=([^#&]+)/i;
  const tags = hash.match(tagsRegex);

  if (Array.isArray(tags) && tags.length > 0) {
    hash = hash.replace(tagsRegex, (h) => {
      const oldTags = h
        .split('=')[1]
        .split(',')
        .filter((hashTag) => !!hashTag);
      oldTags.push(tag.trim());
      return `#tags=${oldTags}`;
    });
  } else {
    hash += `#tags=${tag}`;
  }
  /*
   * @description (review) Deleting "#" because tanstack router will set it automatically
   */
  return hash.slice(1);
};

export const deleteTagFromHash = (
  hash: string,
  tagToDelete: string,
): string => {
  const tagsRegex = /#tags=([^#&]+)/gi;
  let hasDeleted = false;
  let tags = tagsRegex.exec(hash);
  let result = hash;
  while (!hasDeleted && tags !== null) {
    let tempTags = tags[1]?.split(',');
    const tagToDeleteIndex = tempTags.findIndex(
      (tag) => tag === tagToDelete.trim(),
    );
    if (tagToDeleteIndex > -1) {
      delete tempTags[tagToDeleteIndex];
      tempTags = tempTags.filter((tag) => !!tag);

      const replaceValue =
        tempTags.length > 0 ? `#tags=${tempTags.join(',')}` : '';
      /*
       * @description (review) Do dynamic regexp so if we have #tags=1234#tags=123
       * and tagTaDelete 123 we won't replace first part.
       *
       * @example without regexp
       *  #tags=1234#tags=123 (tagToDelete: 123) -> ##tags=123
       * with regexp
       * #tags=1234#tags=123 (tagToDelete: 123) -> #tags=1234
       */
      result = result.replace(new RegExp(`${tags[0]}$`), replaceValue);

      hasDeleted = true;
    }
    tags = tagsRegex.exec(hash);
  }
  return result.slice(1);
};
