// Shared by every admin editor with a displayOrder field. Checks the
// value about to be saved against every sibling already using the API —
// excluding the record being edited, so saving with its own unchanged
// number never flags itself.
export function findDisplayOrderConflict(
  siblings,
  currentId,
  displayOrder,
  getLabel,
) {
  const conflict = siblings.find(
    (item) =>
      item.id !== currentId &&
      Number(item.displayOrder) === Number(displayOrder),
  );
  return conflict ? getLabel(conflict) : null;
}

export function findMissingRequiredFields(form, requiredFields) {
  return requiredFields.filter((field) => !String(form[field] ?? "").trim());
}
