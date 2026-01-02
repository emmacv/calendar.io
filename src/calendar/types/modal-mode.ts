const MODAL_MODE_TYPES = {
  EDIT: 'edit',
  ADD: 'add',
};

type MODAL_MODE_TYPES =
  (typeof MODAL_MODE_TYPES)[keyof typeof MODAL_MODE_TYPES];

export { MODAL_MODE_TYPES };
