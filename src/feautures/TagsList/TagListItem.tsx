import React, { FC, memo } from 'react';

const TagsListItem: FC = () => {
  return <div>123</div>;
};

TagsListItem.displayName = 'TagsListItem';
export const TagsListItemMemorized = memo(TagsListItem);
export default TagsListItem;
