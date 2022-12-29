import React, { FC } from 'react';
import { Stack, Typography, useTheme } from '@mui/material';
import TagForm from '@src/feautures/TagsList/TagForm';
import { getTagsFromUrlHash } from '@src/feautures/TagsList/tags.utils';
import { TagsListMemorized } from '@src/feautures/TagsList/TagsList';
import { router } from '@src/router/router';

const IndexPage: FC = () => {
  const theme = useTheme();
  const tags = getTagsFromUrlHash(router.history.location.hash);

  return (
    <Stack gap={theme.spacing(1)}>
      <Typography variant="h4" align="center">
        Add your tags 🏷️
      </Typography>
      <TagForm />
      <TagsListMemorized tags={tags} />
    </Stack>
  );
};

IndexPage.displayName = 'IndexPage';
export default IndexPage;
