import React, { FC, memo } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { deleteTagFromHash } from '@src/feautures/TagsList/tags.utils';
import { useRouter } from '@tanstack/react-router';
interface TagsListItemProps {
  tag: string;
}
const TagsListItem: FC<TagsListItemProps> = ({ tag }) => {
  const theme = useTheme();
  const router = useRouter();

  const handleDelete = async () => {
    const newHash = deleteTagFromHash(router.history.location.hash, tag);
    await router.navigate({
      to: '/',
      hash: newHash,
    });
  };

  return (
    <Box
      sx={{
        padding: '16px',
        borderRadius: '16px',
        backgroundColor: theme.palette.grey.A100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing(1),
      }}
    >
      <Typography data-testid="tag-list-item-name">{tag}</Typography>
      <IconButton onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

TagsListItem.displayName = 'TagsListItem';
export const TagsListItemMemorized = memo(TagsListItem);
export default TagsListItem;
