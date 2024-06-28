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

export type BasicTableValue = {
    fields: Array<string>,
    actions: BasicTableAction
}

export type BasicTableAction = {
    canView: boolean,
    canEdit: boolean,
    canRemove: boolean,
    canAccept: boolean,
    onView: () => void,
    onEdit: () => void,
    onRemove: () => void,
    onAccept: () => void,
    canRenderView: boolean,
    canRenderEdit: boolean,
    canRenderRemove: boolean,
    canRenderAccept: boolean
}