import React, { FC } from 'react';
import { Box } from '@mui/material';
import TagForm from '@src/feautures/TagsList/TagForm';
import { getTagsFromUrlHash } from '@src/feautures/TagsList/tags.utils';
import { TagsListMemorized } from '@src/feautures/TagsList/TagsList';
import { router } from '@src/router/router';

const IndexPage: FC = () => {
  const tags = getTagsFromUrlHash(router.history.location.hash);

  return (
    <Box>
      <TagForm />
      <TagsListMemorized tags={tags} />
    </Box>
  );
};

IndexPage.displayName = 'IndexPage';
export default IndexPage;
