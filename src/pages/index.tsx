import React, { FC, useState } from 'react';
import { Box, Button, Stack, TextField, useTheme } from '@mui/material';
import {
  addTagHashToUrl,
  deleteTagFromHash,
  getTagsFromUrlHash,
  TagType,
  tagValidationSchema,
} from '@src/feautures/TagsList/tags.utils';
import TagsList from '@src/feautures/TagsList/TagsList';
import { router } from '@src/router/router';
import { parseZodErrors } from '@src/utils/errors/zod.utils';

const IndexPage: FC = () => {
  const tags = getTagsFromUrlHash(router.history.location.hash);

  const theme = useTheme();
  const [tag, setTag] = useState<TagType>('');
  const [tagError, setTagError] = useState<string | null>(null);

  /*
   * @description (review) In handleChangeTag I setTag every time even on error,
   * I do this because it would be more controlled experience for the user if they
   * can change anything but can't submit in error cases
   * */
  const handleChangeTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = tagValidationSchema.safeParse(e.target.value);
    setTag(e.target.value);
    if (parsedValue.success) {
      return setTagError(null);
    }
    return setTagError(parseZodErrors(parsedValue.error));
  };

  const handleAddTag = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newHash = addTagHashToUrl(router.history.location.hash, tag);
    await router.navigate({
      to: '/',
      hash: newHash,
    });
    return setTag('');
  };

  const handleDeleteTag = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newHash = deleteTagFromHash(router.history.location.hash, tag);
    console.log(newHash, 'new');
    await router.navigate({
      to: '/',
      hash: newHash,
    });
    return setTag('');
  };

  return (
    <Box>
      <TagsList />
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
        }}
      >
        <Stack direction="row" gap={theme.spacing(1)}>
          <TextField
            value={tag}
            onChange={handleChangeTag}
            label="Tag name"
            size="small"
            error={!!tagError}
            helperText={tagError}
          />
          <Button
            onClick={handleAddTag}
            type="submit"
            variant="contained"
            disabled={!!tagError || !tag.trim()}
            sx={{ maxHeight: '40px' }}
          >
            Add tag
          </Button>{' '}
          <Button
            onClick={handleDeleteTag}
            type="submit"
            variant="contained"
            disabled={!!tagError || !tag.trim()}
            sx={{ maxHeight: '40px' }}
          >
            Delete tag
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default IndexPage;
