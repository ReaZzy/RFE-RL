import React, { FC, memo } from 'react';
import { Stack, Typography, useTheme } from '@mui/material';
import TagsListItem from '@src/feautures/TagsList/TagListItem';
import { TagType } from '@src/feautures/TagsList/tags.utils';
import { v4 as uuidv4 } from 'uuid';

interface TagListProps {
  tags: Array<TagType>;
}

const TagsList: FC<TagListProps> = ({ tags }) => {
  const theme = useTheme();
  return (
    <Stack gap={theme.spacing(1)}>
      {tags.length > 0 ? (
        tags.map((tag) => (
          /*
           * @description (review) As we don't have any unique information in tags
           * there are no correct ways to get keys unique without some random.
           * that's why I use js crypto API to generate unique uuid for our tags :)
           *
           * P.S. just checked, and it doesn't work on mobile safari, so I will use
           * uuidv4 :D
           *
           * Can i use (90% - 97% coverage):
           * https://caniuse.com/?search=crypto
           * */
          <TagsListItem tag={tag} key={`tag-${uuidv4()}`} />
        ))
      ) : (
        <Typography align="center">There are no tags</Typography>
      )}
    </Stack>
  );
};

TagsList.displayName = 'TagsList';
export const TagsListMemorized = memo(TagsList);
export default TagsList;
