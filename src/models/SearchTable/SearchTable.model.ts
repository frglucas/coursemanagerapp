export type SearchTableValue = {
    fields: Array<string>,
    actions: SearchTableAction
}

export type SearchTableAction = {
    canView: boolean,
    canEdit: boolean,
    canRemove: boolean,
    onView: () => void,
    onEdit: () => void,
    onRemove: () => void,
    canRenderView: boolean,
    canRenderEdit: boolean,
    canRenderRemove: boolean
}