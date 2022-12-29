import {
  addTagHashToUrl,
  deleteTagFromHash,
  getTagsFromUrlHash,
} from '@src/feautures/TagsList/tags.utils';

describe('getTagsFromUrlHash', () => {
  it('Should be defined', () => {
    expect(getTagsFromUrlHash).toBeDefined();
  });
  it('Should return empty array when we don`t have tags', () => {
    const act = getTagsFromUrlHash('https://localhost/');
    expect(act).toHaveLength(0);
  });
  it('Should return array with length 3', () => {
    const act = getTagsFromUrlHash('https://localhost/#tags=1,2,3');
    expect(act).toEqual(['1', '2', '3']);
  });
  it('Should work recursively', () => {
    const act = getTagsFromUrlHash(
      'https://localhost/#tags=1,2,3#tags=1,2,3#tags=1,2,3',
    );
    expect(act).toEqual(['1', '2', '3', '1', '2', '3', '1', '2', '3']);
  });
  it('Should split only comas', () => {
    const act = getTagsFromUrlHash('https://localhost/#tags=1.2,3');
    expect(act).toEqual(['1.2', '3']);
  });
  it('Should return empty array when tags are empty', () => {
    const act = getTagsFromUrlHash('https://localhost/#tags=');
    expect(act).toEqual([]);
  });
  it('Should extract only tags', () => {
    const act = getTagsFromUrlHash(
      'https://localhost/#tags=1,2#tag=1,2#ll=1,2',
    );
    expect(act).toEqual(['1', '2']);
  });
});

describe('addTagHashToUrl', () => {
  it('Should be defined', () => {
    expect(addTagHashToUrl).toBeDefined();
  });

  it('Should add tags to hash if tags are not exists', () => {
    const act = addTagHashToUrl('', '123');
    expect(act).toEqual('tags=123');
  });

  it('Should add comma if there are more than 1 tag', () => {
    const act = addTagHashToUrl('#tags=123', '123');
    expect(act).toEqual('tags=123,123');
  });

  it('Should work with more than 1 #tags', () => {
    const act = addTagHashToUrl('#tags=123#tags=234', '123');
    expect(act).toEqual('tags=123,123#tags=234');
  });
});

describe('deleteTagFromHash', () => {
  it('Should be defined', () => {
    expect(deleteTagFromHash).toBeDefined();
  });

  it('Should do nothing if tag doesnt exist', () => {
    const act = deleteTagFromHash('#tags=1', '123');
    expect(act).toEqual('tags=1');
  });

  it('Should delete tag', () => {
    const act = deleteTagFromHash('#tags=123', '123');
    expect(act).toEqual('');
  });

  it('Should delete only needed tag', () => {
    const act = deleteTagFromHash('#tags=123,1234', '123');
    expect(act).toEqual('tags=1234');
  });

  it('Should delete only 1 tag', () => {
    const act = deleteTagFromHash('#tags=123,123', '123');
    expect(act).toEqual('tags=123');
  });

  it('Should delete tags if there are more than 1 #tags', () => {
    const act = deleteTagFromHash('#tags=1234#tags=123', '123');
    expect(act).toEqual('tags=1234');
  });
  it('Should delete tags if there are more than 1 #tags (2)', () => {
    const act = deleteTagFromHash('#tags=1234#tags=123', '1234');
    expect(act).toEqual('tags=123');
  });
});
