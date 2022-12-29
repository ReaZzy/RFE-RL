import React, { FC, memo } from 'react';
import { TagType } from '@src/feautures/TagsList/tags.utils';

interface TagListProps {
  tags: Array<TagType>;
}

const TagsList: FC<TagListProps> = ({ tags }) => {
  return (
    <div>
      {tags.map((tag) => (
        <div>{tag}</div>
      ))}
    </div>
  );
};

TagsList.displayName = 'TagsList';
export const TagsListMemorized = memo(TagsList);
export default TagsList;
